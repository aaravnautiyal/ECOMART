// server/routes/auth.js

const express = require('express');
const router = express.Router();
const db = require('../db'); // Your database pool
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new account
router.post('/register', async (req, res, next) => {
  try {
    // Note: We now expect 'fullname' instead of 'name' from the request body
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: 'Full name, email, and password are required.' });
    }

    // Check if account exists in the 'accounts' table
    const existingAccountResult = await db.query('SELECT * FROM accounts WHERE email = $1', [email]);
    if (existingAccountResult.rows.length > 0) {
      return res.status(409).json({ message: 'An account with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into the 'accounts' table with the correct columns
    const insertQuery = 'INSERT INTO accounts (fullname, email, password_hash) VALUES ($1, $2, $3) RETURNING account_id, email, fullname';
    const newAccountResult = await db.query(insertQuery, [fullname, email, hashedPassword]);

    res.status(201).json({ message: 'Account registered successfully', account: newAccountResult.rows[0] });
  } catch (error) {
    next(error);
  }
});

// Login to an account
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find the account by email in the 'accounts' table
    const result = await db.query('SELECT * FROM accounts WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const account = result.rows[0];

    // Compare password with the 'password_hash' column
    const isMatch = await bcrypt.compare(password, account.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a token with 'accountId' using the 'account_id' from the database
    const token = jwt.sign({ accountId: account.account_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      account: { 
        id: account.account_id, 
        fullname: account.fullname, 
        email: account.email 
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;