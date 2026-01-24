const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// The pool will use the DATABASE_URL from the .env file
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};