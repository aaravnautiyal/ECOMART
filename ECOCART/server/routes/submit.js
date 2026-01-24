const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../db'); 
const { fuzzify } = require('../FuzzyLogic/fuzzifier');


router.post('/submit', async (req, res, next) => {
  try {
    const rawData = req.body;
    console.log("Received raw data:", rawData);

    // --- Part 1: Fuzzy Logic and ML Prediction 
    const fuzzifiedInput = fuzzify(rawData);
    
    const inputArray = [
      fuzzifiedInput.cert_low, fuzzifiedInput.cert_med, fuzzifiedInput.cert_high,
      fuzzifiedInput.recycled_low, fuzzifiedInput.recycled_med, fuzzifiedInput.recycled_high,
      fuzzifiedInput.carbon_low, fuzzifiedInput.carbon_med, fuzzifiedInput.carbon_high,
      fuzzifiedInput.energy_low, fuzzifiedInput.energy_med, fuzzifiedInput.energy_high,
      fuzzifiedInput.battery_included,
      fuzzifiedInput.company_practices
    ];

    const flaskRes = await axios.post('http://localhost:8000/predict', {
      input: inputArray
    });

    const eco_score = flaskRes.data.eco_score;
    console.log("Received eco_score:", eco_score);

    
    
    const {
        product_name,
        description,
        category,
        brand,
        price,
        stock_quantity,
        sku,
        is_ecofriendly,
        seller_id 
    } = rawData;
    
    if (!seller_id) {
        throw new Error("A seller_id is required to create a product.");
    }

    // The SQL query now inserts into the dedicated 'eco_score' column.
    // 'rating' is not included, so it will get its default value or NULL.
    const insertQuery = `
      INSERT INTO products (
        product_name, description, category, brand, price, stock_quantity, 
        sku, is_ecofriendly, seller_id, eco_score 
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
      ) RETURNING product_id, product_name, eco_score;
    `;

    
    const values = [
        product_name,
        description,
        category,
        brand,
        price,
        stock_quantity,
        sku,
        is_ecofriendly,
        seller_id,
        eco_score // This goes into the new 'eco_score' column.
    ];

    
    const newProductResult = await db.query(insertQuery, values);
    
    console.log("Product saved successfully to PostgreSQL:", newProductResult.rows[0]);

    
    res.status(201).json({
        message: "Product created and scored successfully!",
        product: newProductResult.rows[0]
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;