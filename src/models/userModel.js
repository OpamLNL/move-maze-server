const userRepository = require('../repositories/userRepository');
const { generateToken } = require('../services/authService');

const getUserById = async (userId) => {
    try {
        const user = await userRepository.getUserById(userId);
        if (!user) {
            throw new Error('Користувач не знайдений.');
        }
        return user;
    } catch (error) {
        throw new Error('Помилка отримання користувача: ' + error.message);
    }
};

const getUserByEmail = async (email) => {
    try {
        const user = await userRepository.getUserByEmail(email);
        if (!user) {
            throw new Error('Користувач не знайдений.');
        }
        return user;
    } catch (error) {
        throw new Error('Помилка отримання користувача: ' + error.message);
    }
};

const getAllUsers = async () => {
    try {
        const users = await userRepository.getAllUsers();
        return users;
    } catch (error) {
        throw new Error('Помилка отримання списку користувачів: ' + error.message);
    }
};

const createUser = async (userData) => {
    try {
        const newUser = await userRepository.createUser(userData);
        const token = generateToken(newUser.id);
        return { user: newUser, token };
    } catch (error) {
        throw new Error('Помилка створення користувача: ' + error.message);
    }
};

const updateUser = async (userId, userData) => {
    try {
        const updatedUser = await userRepository.updateUser(userId, userData);
        return { id: userId, ...userData };
    } catch (error) {
        throw new Error('Помилка оновлення користувача: ' + error.message);
    }
};

const deleteUser = async (userId) => {
    try {
        await userRepository.deleteUser(userId);
        return { id: userId };
    } catch (error) {
        throw new Error('Помилка видалення користувача: ' + error.message);
    }
};

const getActiveUsers = async () => {
    try {
        const activeUsers = await userRepository.getActiveUsers();
        return activeUsers;
    } catch (error) {
        throw new Error('Помилка отримання активних користувачів: ' + error.message);
    }
};

module.exports = {
    getUserById,
    getUserByEmail,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getActiveUsers
};
