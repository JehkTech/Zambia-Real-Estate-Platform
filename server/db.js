import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();
// dotenv.config({ path: "./server/.env" }); // <— use this when .env is inside /server

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.warn('[server/db] DATABASE_URL is not set. Please configure it in a .env file.');
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
