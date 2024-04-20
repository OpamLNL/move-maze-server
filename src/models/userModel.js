const userRepository = require('../repositories/userRepository');
const jwt = require('jsonwebtoken');

const getUserById = async (userId) => {
    const [user] = await userRepository.getUserById(userId);
    return user;
};

const getUserByEmail = async (email) => {
    const [user] = await userRepository.getUserByEmail(email);
    return user;
};

const getAllUsers = async () => {
    const users = await userRepository.getAllUsers();
    console.log(users);
    return users;
};

const createUser = async (userData) => {
    const newUser = await userRepository.createUser(userData);
    const token = jwt.sign(
        { id: newUser.insertId },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '24h' }
    );
    return { user: newUser, token };
};

const updateUser = async (userId, userData) => {
    await userRepository.updateUser(userId, userData);
    return { id: userId, ...userData };
};

const deleteUser = async (userId) => {
    await userRepository.deleteUser(userId);
    return { id: userId };
};

const getActiveUsers = async () => {
    return await userRepository.getActiveUsers();
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
