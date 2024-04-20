const gamesRepository = require('../repositories/gameRepository');

const getGameById = async (gameId) => {
    return await gamesRepository.getGameById(gameId);
};

const getAllGames = async () => {
    return await gamesRepository.getAllGames();
};

const createGame = async (gameData) => {
    return await gamesRepository.createGame(gameData);
};

const updateGame = async (gameId, gameData) => {
    return await gamesRepository.updateGame(gameId, gameData);
};

const deleteGame = async (gameId) => {
    return await gamesRepository.deleteGame(gameId);
};

module.exports = {
    getGameById,
    getAllGames,
    createGame,
    updateGame,
    deleteGame
};
