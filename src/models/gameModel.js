const dbConnection = require('../config/database');

// Отримати всі ігри
const getAllGames = async () => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'SELECT * FROM games';
        console.log("games");
        dbConnection.query(sqlQuery, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// Створити нову гру
const createGame = async (gameData) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'INSERT INTO games SET ?';
        dbConnection.query(sqlQuery, gameData, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve({ id: result.insertId, ...gameData });
            }
        });
    });
};

// Оновити інформацію про гру
const updateGame = async (gameId, newData) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'UPDATE games SET ? WHERE id = ?';
        dbConnection.query(sqlQuery, [newData, gameId], (error) => {
            if (error) {
                reject(error);
            } else {
                resolve({ id: gameId, ...newData });
            }
        });
    });
};

// Видалити гру
const deleteGame = async (gameId) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'DELETE FROM games WHERE id = ?';
        dbConnection.query(sqlQuery, gameId, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve({ id: gameId });
            }
        });
    });
};

module.exports = {
    getAllGames,
    createGame,
    updateGame,
    deleteGame,
};
