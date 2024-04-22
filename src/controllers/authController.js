// authController.js
const bcrypt = require('bcrypt');
const { getUserByEmail } = require('./usersController');
const { generateToken } = require('../services/authService');

exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usersByEmail = await getUserByEmail(email);
        const user = usersByEmail[0];
        if (!usersByEmail) {
            return res.status(401).json({ message: "Невірний email або пароль" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Невірний email або пароль" });
        }

        const token = generateToken({ userId: user.id, email: user.email });
        console.log("Генерований JWT:", token);
        res.json({ token });
    } catch (error) {
        console.error('Auth error:', error);
        res.status(500).json({ message: "Внутрішня помилка сервера" });
    }
};
