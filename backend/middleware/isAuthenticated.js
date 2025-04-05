const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAuthenticated = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded JWT:', decoded); // Verifica que el decoded contiene el ID del usuario
        req.user = decoded; // Este debe contener el id y role
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token is not valid' });
    }
};


module.exports = { isAuthenticated };
