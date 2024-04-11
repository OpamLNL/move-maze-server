const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id; // Отримуємо айді з параметрів запиту

        if (!userId) {
            return res.status(400).json({ error: 'Missing user ID' });
        }

        const user = await userModel.getUserById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Помилка отримання користувача за айді:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Отримати всіх користувачів
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Помилка отримання користувачів:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Створити нового користувача
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;



const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

const createUser = async (req, res) => {

    try {
        const { username, email, password, avatar, birth_date, bio, phone_number, language, timezone } = req.body;

        const hashedPassword = await hashPassword(password);

        const userData = {
            username,
            email,
            password: hashedPassword,
            avatar: avatar || 'default_avatar.png',  // Припустимо, 'default_avatar.png' - ваше зображення за замовчуванням
            birth_date: birth_date || null,
            bio: bio || '',
            phone_number: phone_number || null,
            language: language || 'uk',  // Припустимо, 'uk' - мова за замовчуванням
            timezone: timezone || 'UTC',  // Припустимо, 'UTC' - часовий пояс за замовчуванням
            status: 'active',  // Статус користувача за замовчуванням
            last_visit: new Date()  // Записуємо час створення користувача як останній візит
        };

        const newUser = await userModel.createUser(userData);

        const token = jwt.sign(
            { id: newUser.id, username: newUser.username },
            secretKey,
            { expiresIn: '24h' }
        );

        res.status(201).json({ user: newUser, token });
    } catch (error) {
        console.error('Помилка створення користувача:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Оновити інформацію про користувача
const updateUser = async (req, res) => {
    try {
        const updatedUser = await userModel.updateUser(req.params.id, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Помилка оновлення користувача:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Видалити користувача
const deleteUser = async (req, res) => {
    try {
        await userModel.deleteUser(req.params.id);
        res.status(204).end();
    } catch (error) {
        console.error('Помилка видалення користувача:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Отримати активних користувачів
const getActiveUsers = async (req, res) => {
    try {
        const activeTimePeriod = new Date(); // Отримання поточного часу
        const activeUsers = await userModel.getActiveUsers(activeTimePeriod);
        res.status(200).json(activeUsers);
    } catch (error) {
        console.error('Помилка отримання активних користувачів:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getUserById,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getActiveUsers, // Додаємо метод отримання активних користувачів
};
