-- Drop tables in dev to allow re-running the migration during development
DROP TABLE IF EXISTS billing_transactions;
DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id UUID PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  profile_image_url TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  member_since TEXT,
  location TEXT,
  bio TEXT,
  preferences JSONB,
  kyc JSONB,
  stats JSONB
);

CREATE TABLE properties (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  price_text TEXT NOT NULL,
  price_type TEXT,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  category TEXT NOT NULL,
  bedrooms INT,
  bathrooms INT,
  bedspaces INT,
  available_bedspaces INT,
  distance_from_uni TEXT,
  amenities TEXT[],
  area TEXT NOT NULL,
  image_url TEXT NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  owner_name TEXT NOT NULL,
  owner_phone TEXT NOT NULL,
  owner_verified BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE billing_transactions (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  amount TEXT NOT NULL,
  status TEXT NOT NULL
);

-- Seed a single user matching the mock account
INSERT INTO users (
  id, first_name, last_name, email, phone, profile_image_url, is_verified,
  member_since, location, bio, preferences, kyc, stats
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  'John',
  'Mwanza',
  'john.mwanza@email.com',
  '+260977123456',
  '/api/placeholder/150/150',
  true,
  '2023',
  'Lusaka, Zambia',
  'Property investor and landlord with 5+ years experience in Zambian real estate market.',
  '{"emailNotifications": true, "smsNotifications": false, "marketingEmails": true, "propertyAlerts": true}',
  '{"nrcVerified": true, "phoneVerified": true, "emailVerified": true, "addressVerified": false}',
  '{"propertiesListed": 12, "propertiesSold": 8, "totalViews": 15420, "responseRate": 95}'
);

-- Seed some properties roughly matching the current mock data (home featured, buy, rent, commercial, boarding)
INSERT INTO properties (
  id, title, price_text, price_type, location, type, category,
  bedrooms, bathrooms, bedspaces, available_bedspaces, distance_from_uni,
  amenities, area, image_url, verified, featured,
  owner_name, owner_phone, owner_verified
) VALUES
  -- Featured/home examples
  ('00000000-0000-0000-0000-000000000001', 'Modern 3-Bedroom Apartment in Kabulonga', 'K3,500', NULL, 'Kabulonga, Lusaka', 'rent', 'residential', 3, 2, NULL, NULL, NULL, NULL, '120 sqm', '/api/placeholder/400/300', true, true, 'John Mwanza', '+260977123456', true),
  ('00000000-0000-0000-0000-000000000002', 'Spacious 4-Bedroom House with Garden', 'K850,000', NULL, 'Rhodespark, Lusaka', 'buy', 'residential', 4, 3, NULL, NULL, NULL, NULL, '250 sqm', '/api/placeholder/400/300', true, false, 'Mary Banda', '+260966789012', true),
  ('00000000-0000-0000-0000-000000000003', 'Commercial Plot in City Center', 'K2,500,000', NULL, 'CBD, Lusaka', 'land', 'commercial', NULL, NULL, NULL, NULL, NULL, NULL, '1,500 sqm', '/api/placeholder/400/300', true, false, 'David Ng''oma', '+260955345678', true),
  -- Buy page examples
  ('00000000-0000-0000-0000-000000000004', 'Executive 4-Bedroom House in Kabulonga', 'K1,250,000', NULL, 'Kabulonga, Lusaka', 'buy', 'residential', 4, 3, NULL, NULL, NULL, NULL, '280 sqm', '/api/placeholder/400/300', true, true, 'John Mwanza', '+260977123456', true),
  ('00000000-0000-0000-0000-000000000005', 'Modern 3-Bedroom Townhouse', 'K850,000', NULL, 'Rhodespark, Lusaka', 'buy', 'residential', 3, 2, NULL, NULL, NULL, NULL, '180 sqm', '/api/placeholder/400/300', true, false, 'Mary Banda', '+260966789012', true),
  ('00000000-0000-0000-0000-000000000006', 'Luxury 5-Bedroom Villa with Pool', 'K2,500,000', NULL, 'Chalala, Lusaka', 'buy', 'residential', 5, 4, NULL, NULL, NULL, NULL, '400 sqm', '/api/placeholder/400/300', true, true, 'David Ng''oma', '+260955345678', true),
  -- Rent page examples
  ('00000000-0000-0000-0000-000000000007', 'Furnished 2-Bedroom in Rhodespark', 'K2,800', NULL, 'Rhodespark, Lusaka', 'rent', 'residential', 2, 2, NULL, NULL, NULL, NULL, '90 sqm', '/api/placeholder/400/300', true, false, 'Mary Banda', '+260966789012', true),
  ('00000000-0000-0000-0000-000000000008', 'Spacious 4-Bedroom House', 'K5,200', NULL, 'Chalala, Lusaka', 'rent', 'residential', 4, 3, NULL, NULL, NULL, NULL, '250 sqm', '/api/placeholder/400/300', true, true, 'David Ng''oma', '+260955345678', true),
  -- Boarding page examples
  ('00000000-0000-0000-0000-000000000009', 'Modern Student Lodge - UNZA Campus', 'K350', 'per bedspace/month', 'Great East Road, near UNZA', 'boarding', 'boarding', NULL, 2, 4, 2, '0.5km from UNZA', ARRAY['Free WiFi','Study Room','Security','Laundry'], '12 sqm per room', '/api/placeholder/400/300', true, true, 'Student Housing Ltd', '+260977123456', true),
  ('00000000-0000-0000-0000-000000000010', 'Affordable Boarding House - CBU Area', 'K280', 'per bedspace/month', 'Riverside, near CBU', 'boarding', 'boarding', NULL, 3, 6, 3, '1.2km from CBU', ARRAY['WiFi','Kitchen','Security Guard','Parking'], '10 sqm per room', '/api/placeholder/400/300', true, false, 'Mary Mwanza', '+260966789012', true),
  -- Commercial page examples
  ('00000000-0000-0000-0000-000000000011', 'Modern Office Space in CBD', 'K4,500/month', NULL, 'Cairo Road, Lusaka', 'rent', 'commercial', 0, 2, NULL, NULL, NULL, NULL, '200 sqm', '/api/placeholder/400/300', true, true, 'Business Properties Ltd', '+260977123456', true),
  ('00000000-0000-0000-0000-000000000012', 'Retail Shop in Manda Hill', 'K8,500/month', NULL, 'Manda Hill, Lusaka', 'rent', 'commercial', 0, 1, NULL, NULL, NULL, NULL, '150 sqm', '/api/placeholder/400/300', true, false, 'Manda Properties', '+260966789012', true);

-- Seed billing history matching AccountPage
INSERT INTO billing_transactions (id, user_id, date, description, amount, status) VALUES
  ('22222222-2222-2222-2222-222222222221', '11111111-1111-1111-1111-111111111111', '2024-01-15', 'Featured Listing - 3BR House Kabulonga', 'K150', 'Paid'),
  ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', '2023-12-08', 'Basic Listing - Modern Apartment', 'K50', 'Paid'),
  ('22222222-2222-2222-2222-222222222223', '11111111-1111-1111-1111-111111111111', '2023-11-22', 'Transaction Fee - Property Sale', 'K1,250', 'Paid');
