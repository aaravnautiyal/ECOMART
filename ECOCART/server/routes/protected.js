const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

router.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ name: 'John Doe', email: 'john@example.com' });
});

module.exports = router;
