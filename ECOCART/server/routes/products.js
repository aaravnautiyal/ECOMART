const express = require('express');
const router = express.Router();
const db = require('../db');

// --- GET A SINGLE PRODUCT BY ID ---
// This route will handle requests like GET /api/products/123
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params; // Get the product ID from the URL parameters
    
    // Query to select the product from the database
    // This is a simple query, but you could JOIN other tables (like reviews) here later.
    const query = 'SELECT * FROM products WHERE product_id = $1';
    
    const { rows } = await db.query(query, [id]);

    // Check if a product was found
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Send the found product as the response
    res.json(rows[0]);

  } catch (error) {
    next(error); // Pass errors to the global error handler
  }
});

module.exports = router;