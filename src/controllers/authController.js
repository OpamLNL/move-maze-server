// authController.js
const bcrypt = require('bcrypt');
const { getUserByEmail } = require('./usersController');
const { generateTokens } = require('../services/authService');

exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usersByEmail = await getUserByEmail(email);
        const user = usersByEmail[0];
        if (!user) {
            return res.status(401).json({ message: "Невірний email або пароль" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Невірний email або пароль" });
        }

        const { accessToken, refreshToken } = generateTokens(user.id);
        res.json({ accessToken, refreshToken });
    } catch (error) {
        console.error('Auth error:', error);
        res.status(500).json({ message: "Внутрішня помилка сервера" });
    }
};
