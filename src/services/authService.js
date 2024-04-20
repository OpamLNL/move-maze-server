const jwt = require('jsonwebtoken');
require('dotenv').config();

// Генерування токена для користувача
const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '24h' }
    );
};

// Перевірка токена на валідність
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
        return null;
    }
};

// Middleware для захисту маршрутів
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401); // Немає токена
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Недійсний токен
        }

        req.user = user;
        next();
    });
};

module.exports = {
    generateToken,
    verifyToken,
    authenticateToken
};
