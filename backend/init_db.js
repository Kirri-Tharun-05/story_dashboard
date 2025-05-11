require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Replace with your actual credentials
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;

// PASS : tharun2005++

