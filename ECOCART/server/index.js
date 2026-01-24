

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');



dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


const corsOptions = {
  origin: 'http://localhost:3000'
};
app.use(cors(corsOptions));
app.use(express.json());

// --- Routes ---
const authRoutes = require('./routes/auth');
const dashboardRoutes = require("./routes/dashboard");
const protectedRoutes = require('./routes/protected');
const submitRoute = require('./routes/submit'); // <-- 1. IMPORT THE NEW ROUTE
const productRoute = require('./routes/products');
const rec=require('./routes/productRoutes')

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api', protectedRoutes);
app.use('/api/products', submitRoute); // <-- 2. USE THE NEW ROUTE
app.use('/api/product' , productRoute)
app.get('/login', (req, res) => {
  res.send("Welcome");
});
app.use('/api/products/bulk',rec);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || 'An internal server error occurred.'
  });
});
// server/index.js or your route file
app.get('/api/products', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM products ORDER BY eco_score DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


const startServer = async () => {
  try {
    const client = await db.query('SELECT NOW()');
    console.log('Connected to PostgreSQL at:', client.rows[0].now);

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();