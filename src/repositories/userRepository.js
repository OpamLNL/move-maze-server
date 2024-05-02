const initializeDatabaseConnection = require('../config/database');

const getUserById = async (userId) => {
    const sqlQuery = 'SELECT * FROM users WHERE id = ?';
    return initializeDatabaseConnection.query(sqlQuery, [userId]);
};

const getUserByEmail = async (email) => {
    const sqlQuery = 'SELECT * FROM users WHERE email = ?';
    const [users, fields] = await initializeDatabaseConnection.query(sqlQuery, [email]);
    console.log(users[0]);
    return users || null;
};

const getAllUsers = async () => {
    const sqlQuery = 'SELECT id, username, email, role FROM users';
    return await initializeDatabaseConnection.query(sqlQuery);
};

const createUser = async (userData) => {
    const sqlQuery = 'INSERT INTO users SET ?';
    return initializeDatabaseConnection.query(sqlQuery, userData);
};

const updateUser = async (userId, userData) => {
    const sqlQuery = 'UPDATE users SET ? WHERE id = ?';
    return initializeDatabaseConnection.query(sqlQuery, [userData, userId]);
};

const deleteUser = async (userId) => {
    const cleanedUserId = userId.substring(1); // Прибираємо перший символ (двокрапку) не знаю чи та нормально
    const sqlQuery = 'DELETE FROM users WHERE id = ?';
    console.log(cleanedUserId + "________________________________________");
    return initializeDatabaseConnection.query(sqlQuery, [cleanedUserId]);
};

const getActiveUsers = async () => {
    const currentTimeMs = Date.now();
    const activeTimePeriodMs = currentTimeMs - (15 * 60 * 1000);
    const activeTimePeriod = new Date(activeTimePeriodMs);
    const sqlQuery = 'SELECT * FROM users WHERE last_visit >= ?';
    return initializeDatabaseConnection.query(sqlQuery, [activeTimePeriod]);
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
