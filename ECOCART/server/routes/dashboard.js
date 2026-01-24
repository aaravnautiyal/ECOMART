// server/routes/dashboard.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Protect this route
router.get('/', auth, (req, res) => {
  // Use 'req.user.fullname' instead of 'req.user.name'
  res.json({
    fullname: req.user.fullname,
    email: req.user.email,
    id: req.user.account_id
  });
});

module.exports = router;