const initializeDatabaseConnection = require('../config/database');

const getGameById = async (gameId) => {
    const sqlQuery = 'SELECT * FROM games WHERE id = ?';
    return initializeDatabaseConnection.query(sqlQuery, [gameId]);
};

const getAllGames = async () => {
    const sqlQuery = 'SELECT id, title, description, genre FROM games';
    return initializeDatabaseConnection.query(sqlQuery);
};

const createGame = async (gameData) => {
    const sqlQuery = 'INSERT INTO games SET ?';
    return initializeDatabaseConnection.query(sqlQuery, gameData);
};

const updateGame = async (gameId, gameData) => {
    const sqlQuery = 'UPDATE games SET ? WHERE id = ?';
    return initializeDatabaseConnection.query(sqlQuery, [gameData, gameId]);
};

const deleteGame = async (gameId) => {
    const sqlQuery = 'DELETE FROM games WHERE id = ?';
    return initializeDatabaseConnection.query(sqlQuery, [gameId]);
};

module.exports = {
    getGameById,
    getAllGames,
    createGame,
    updateGame,
    deleteGame
};