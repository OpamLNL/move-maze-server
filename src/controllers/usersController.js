const userModel = require('../models/userModel');


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
        console.log("serserrr1");
        const users = await userModel.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Помилка отримання користувачів:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Створити нового користувача
const createUser = async (req, res) => {
    try {
        const newUser = await userModel.createUser(req.body);
        res.status(201).json(newUser);
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
