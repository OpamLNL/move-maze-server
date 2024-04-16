const dbConnection = require('../config/database');
const jwt = require('jsonwebtoken');

// Users
const getUserById = async (userId) => {
    const sqlQuery = 'SELECT * FROM users WHERE id = ?';
    return dbQuery(sqlQuery, [userId]);
};

const getAllUsers = async () => {
    const sqlQuery = 'SELECT * FROM users';
    return dbQuery(sqlQuery);
};

const createUser = async (userData) => {
    const sqlQuery = 'INSERT INTO users SET ?';
    const result = await dbQuery(sqlQuery, [userData]);
    const userWithoutPassword = { id: result.insertId, ...userData };
    const token = jwt.sign(
        { id: userWithoutPassword.id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '24h' }
    );
    return { user: userWithoutPassword, token };
};

const updateUser = async (userId, newData) => {
    const sqlQuery = 'UPDATE users SET ? WHERE id = ?';
    return dbQuery(sqlQuery, [newData, userId]);
};

const deleteUser = async (userId) => {
    const sqlQuery = 'DELETE FROM users WHERE id = ?';
    return dbQuery(sqlQuery, [userId]);
};

// Games
const getAllGames = async () => {
    const sqlQuery = 'SELECT * FROM games';
    return dbQuery(sqlQuery);
};

const createGame = async (gameData) => {
    const sqlQuery = 'INSERT INTO games SET ?';
    return dbQuery(sqlQuery, [gameData]);
};

const updateGame = async (gameId, gameData) => {
    const sqlQuery = 'UPDATE games SET ? WHERE id = ?';
    return dbQuery(sqlQuery, [gameData, gameId]);
};

const deleteGame = async (gameId) => {
    const sqlQuery = 'DELETE FROM games WHERE id = ?';
    return dbQuery(sqlQuery, [gameId]);
};

// News
const getAllNews = async () => {
    const sqlQuery = 'SELECT * FROM news';
    return dbQuery(sqlQuery);
};

const createNews = async (newsData) => {
    const sqlQuery = 'INSERT INTO news SET ?';
    return dbQuery(sqlQuery, [newsData]);
};

const updateNews = async (newsId, newsData) => {
    const sqlQuery = 'UPDATE news SET ? WHERE id = ?';
    return dbQuery(sqlQuery, [newsData, newsId]);
};

const deleteNews = async (newsId) => {
    const sqlQuery = 'DELETE FROM news WHERE id = ?';
    return dbQuery(sqlQuery, [newsId]);
};

// Helper function to perform database queries
async function dbQuery(sql, params) {
    return new Promise((resolve, reject) => {
        dbConnection.query(sql, params, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    getUserById,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getAllGames,
    createGame,
    updateGame,
    deleteGame,
    getAllNews,
    createNews,
    updateNews,
    deleteNews,
};
