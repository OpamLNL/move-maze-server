// authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getUserByEmail } = require('../models/userModel');




exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    const jwt = require('jsonwebtoken');
    console.log("JWT Secret is:", process.env.JWT_SECRET_KEY);
    const secretKey = process.env.JWT_SECRET_KEY;

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Невірний email або пароль" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Невірний email або пароль" });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            secretKey,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error('Auth error:', error);
        res.status(500).json({ message: "Внутрішня помилка сервера" });
    }
};
