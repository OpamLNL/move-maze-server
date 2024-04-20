const initializeDatabaseConnection = require('../config/database');

const getUserById = async (userId) => {
    const dbConnection = await initializeDatabaseConnection.query();
    const sqlQuery = 'SELECT * FROM users WHERE id = ?';
    return dbConnection.query(sqlQuery, [userId]);
};

const getUserByEmail = async (email) => {
    const dbConnection = await initializeDatabaseConnection.query();
    const sqlQuery = 'SELECT * FROM users WHERE email = ?';
    return dbConnection.query(sqlQuery, [email]);
};

const getAllUsers = async () => {
    const sqlQuery = 'SELECT id, username, email, role FROM users';
    const users = await initializeDatabaseConnection.query(sqlQuery);
    console.log(users);
    return users;
};

const createUser = async (userData) => {
    const dbConnection = await initializeDatabaseConnection.query();
    const sqlQuery = 'INSERT INTO users SET ?';
    return dbConnection.query(sqlQuery, userData);
};

const updateUser = async (userId, userData) => {
    const dbConnection = await initializeDatabaseConnection.query();
    const sqlQuery = 'UPDATE users SET ? WHERE id = ?';
    return dbConnection.query(sqlQuery, [userData, userId]);
};

const deleteUser = async (userId) => {
    const dbConnection = await initializeDatabaseConnection.query();
    const sqlQuery = 'DELETE FROM users WHERE id = ?';
    return dbConnection.query(sqlQuery, [userId]);
};

const getActiveUsers = async () => {
    const dbConnection = await initializeDatabaseConnection.query();
    const currentTimeMs = Date.now();
    const activeTimePeriodMs = currentTimeMs - (15 * 60 * 1000);
    const activeTimePeriod = new Date(activeTimePeriodMs);
    const sqlQuery = 'SELECT * FROM users WHERE last_visit >= ?';
    return dbConnection.query(sqlQuery, [activeTimePeriod]);
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
