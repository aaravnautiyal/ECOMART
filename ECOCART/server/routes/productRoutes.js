// server/routes/productRoutes.js (or similar)

const express = require('express');
const router = express.Router();
const pool = require('../db'); // PostgreSQL pool connection

router.get('', async (req, res) => {
    const idsParam = req.query.ids;
    if (!idsParam) return res.status(400).json({ error: "Missing 'ids' query param" });

    const ids = idsParam.split(',').map(id => parseInt(id)); // 👈 parse to integer

    try {
        const result = await pool.query(
            'SELECT * FROM products WHERE product_id = ANY($1::int[])', // 👈 cast to int[]
            [ids]
        );
        res.json(result.rows);
    } catch (err) {
        console.error("DB error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;