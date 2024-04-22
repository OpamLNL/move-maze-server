const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const authService = require('../services/authService');

const getUserByEmail = async (email) => {
    return userModel.getUserByEmail(email);
};


const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

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

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Помилка отримання користувачів:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createUser = async (req, res) => {
    try {
        const { username, email, password, avatar, birth_date, bio, phone_number, language, timezone } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            username,
            email,
            password: hashedPassword,
            avatar: avatar || 'default_avatar.png',
            birth_date: birth_date || null,
            bio: bio || '',
            phone_number: phone_number || null,
            language: language || 'uk',
            timezone: timezone || 'UTC',
            status: 'active',
            last_visit: new Date()
        };

        const newUser = await userModel.createUser(userData);

        const token = authService.generateToken({ id: newUser.id, username: newUser.username });

        res.status(201).json({ user: newUser, token });
    } catch (error) {
        console.error('Помилка створення користувача:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await userModel.updateUser(req.params.id, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Помилка оновлення користувача:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        await userModel.deleteUser(req.params.id);
        res.status(204).end();
    } catch (error) {
        console.error('Помилка видалення користувача:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

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
    getUserByEmail,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getActiveUsers,
};
