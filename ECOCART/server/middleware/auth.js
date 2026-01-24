// server/middleware/auth.js

const jwt = require('jsonwebtoken');
const db = require('../db'); // Your database pool

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication token required.' });
    }
    
    const token = authHeader.split(' ')[1];

    try {
        // The token payload now contains 'accountId'
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find account by 'account_id' in the 'accounts' table
        // Select the new column names like 'fullname'
        const query = 'SELECT account_id, fullname, email FROM accounts WHERE account_id = $1';
        const { rows } = await db.query(query, [decoded.accountId]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'User not found.' });
        }
        
        // Attach the account object to the request. We'll still call it 'req.user' for convention.
        req.user = rows[0]; 
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};