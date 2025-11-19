import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import { pool } from './db.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.get('/', (_req, res) => {
  res.send('API is running. Try /api/properties');
});

// Helper to map DB row -> Property DTO expected by the frontend
function mapPropertyRow(row) {
  return {
    id: row.id,
    title: row.title,
    price: row.price_text,
    priceType: row.price_type || undefined,
    location: row.location,
    type: row.type,
    bedrooms: row.bedrooms ?? undefined,
    bathrooms: row.bathrooms ?? undefined,
    bedspaces: row.bedspaces ?? undefined,
    availableBedspaces: row.available_bedspaces ?? undefined,
    distanceFromUni: row.distance_from_uni ?? undefined,
    amenities: row.amenities || undefined,
    area: row.area,
    image: row.image_url,
    verified: row.verified,
    featured: row.featured,
    owner: {
      name: row.owner_name,
      phone: row.owner_phone,
      verified: row.owner_verified,
    },
  };
}

// GET /api/properties?type=buy|rent|boarding&category=...&featured=true
app.get('/api/properties', async (req, res) => {
  const { type, category, featured } = req.query;

  const conditions = [];
  const params = [];

  if (type) {
    params.push(type);
    conditions.push(`type = $${params.length}`);
  }
  if (category) {
    params.push(category);
    conditions.push(`category = $${params.length}`);
  }
  if (featured === 'true') {
    conditions.push('featured = true');
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  try {
    const result = await pool.query(
      `SELECT * FROM properties ${whereClause} ORDER BY featured DESC, title ASC`,
      params
    );
    res.json(result.rows.map(mapPropertyRow));
  } catch (err) {
    console.error('[GET /api/properties] Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

// GET /api/properties/:id
app.get('/api/properties/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM properties WHERE id = $1', [req.params.id]);
    if (!result.rows.length) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(mapPropertyRow(result.rows[0]));
  } catch (err) {
    console.error('[GET /api/properties/:id] Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch property' });
  }
});

// POST /api/properties
// Minimal mapping from PostPropertyPage payload -> properties row
app.post('/api/properties', async (req, res) => {
  const {
    title,
    priceText,
    priceType,
    location,
    type,
    category,
    bedrooms,
    bathrooms,
    bedspaces,
    availableBedspaces,
    distanceFromUni,
    amenities,
    area,
    image,
    verified,
    featured,
    owner,
  } = req.body || {};

  if (!title || !priceText || !location || !type || !category || !area || !owner?.name || !owner?.phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const id = nanoid();

  try {
    const result = await pool.query(
      `INSERT INTO properties (
        id, title, price_text, price_type, location, type, category,
        bedrooms, bathrooms, bedspaces, available_bedspaces, distance_from_uni,
        amenities, area, image_url, verified, featured,
        owner_name, owner_phone, owner_verified
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,
        $8,$9,$10,$11,$12,
        $13,$14,$15,$16,$17,
        $18,$19,$20
      ) RETURNING *`,
      [
        id,
        title,
        priceText,
        priceType || null,
        location,
        type,
        category,
        bedrooms ?? null,
        bathrooms ?? null,
        bedspaces ?? null,
        availableBedspaces ?? null,
        distanceFromUni || null,
        amenities && amenities.length ? amenities : null,
        area,
        image || '/api/placeholder/400/300',
        !!verified,
        !!featured,
        owner.name,
        owner.phone,
        !!owner.verified,
      ]
    );

    res.status(201).json(mapPropertyRow(result.rows[0]));
  } catch (err) {
    console.error('[POST /api/properties] Error:', err.message);
    res.status(500).json({ error: 'Failed to create property' });
  }
});

// GET /api/account
app.get('/api/account', async (_req, res) => {
  try {
    const userResult = await pool.query('SELECT * FROM users LIMIT 1');
    if (!userResult.rows.length) {
      return res.status(404).json({ error: 'Account not found' });
    }
    const user = userResult.rows[0];

    const propsResult = await pool.query(
      'SELECT * FROM properties WHERE owner_name = $1 ORDER BY title ASC',
      [`${user.first_name} ${user.last_name}`]
    );

    const billingResult = await pool.query(
      'SELECT * FROM billing_transactions WHERE user_id = $1 ORDER BY date DESC',
      [user.id]
    );

    res.json({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone,
      profileImage: user.profile_image_url,
      isVerified: user.is_verified,
      memberSince: user.member_since,
      location: user.location,
      bio: user.bio,
      preferences: user.preferences || {},
      kyc: user.kyc || {},
      stats: user.stats || {},
      properties: propsResult.rows.map(mapPropertyRow),
      billingHistory: billingResult.rows.map((row) => ({
        id: row.id,
        date: row.date.toISOString().slice(0, 10),
        description: row.description,
        amount: row.amount,
        status: row.status,
      })),
    });
  } catch (err) {
    console.error('[GET /api/account] Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch account' });
  }
});

// PUT /api/account
app.put('/api/account', async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    location,
    bio,
    preferences,
  } = req.body || {};

  try {
    const userResult = await pool.query('SELECT * FROM users LIMIT 1');
    if (!userResult.rows.length) {
      return res.status(404).json({ error: 'Account not found' });
    }
    const user = userResult.rows[0];

    const updated = await pool.query(
      `UPDATE users SET
        first_name = COALESCE($1, first_name),
        last_name = COALESCE($2, last_name),
        email = COALESCE($3, email),
        phone = COALESCE($4, phone),
        location = COALESCE($5, location),
        bio = COALESCE($6, bio),
        preferences = COALESCE($7, preferences)
       WHERE id = $8
       RETURNING *`,
      [
        firstName ?? null,
        lastName ?? null,
        email ?? null,
        phone ?? null,
        location ?? null,
        bio ?? null,
        preferences ?? null,
        user.id,
      ]
    );

    const u = updated.rows[0];

    res.json({
      id: u.id,
      firstName: u.first_name,
      lastName: u.last_name,
      email: u.email,
      phone: u.phone,
      profileImage: u.profile_image_url,
      isVerified: u.is_verified,
      memberSince: u.member_since,
      location: u.location,
      bio: u.bio,
      preferences: u.preferences || {},
      kyc: u.kyc || {},
      stats: u.stats || {},
    });
  } catch (err) {
    console.error('[PUT /api/account] Error:', err.message);
    res.status(500).json({ error: 'Failed to update account' });
  }
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
