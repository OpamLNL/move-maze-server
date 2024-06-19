const gameModel = require('../models/gameModel');

const getGameById = async (req, res) => {
    try {
        const gameId = req.params.id;

        if (!gameId) {
            return res.status(400).json({ error: 'Missing game ID' });
        }

        const game = await gameModel.getGameById(gameId);

        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }

        res.status(200).json(game);
    } catch (error) {
        console.error('Помилка отримання гри за айді:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllGames = async (req, res) => {

console.log('getAllGames');

    try {
        const games = await gameModel.getAllGames();
        res.status(200).json(games);
    } catch (error) {
        console.error('Помилка отримання всіх ігор:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createGame = async (req, res) => {
    try {
        const newGame = await gameModel.createGame(req.body);
        res.status(201).json(newGame);
    } catch (error) {
        console.error('Помилка створення гри:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateGame = async (req, res) => {
    try {
        const updatedGame = await gameModel.updateGame(req.params.id, req.body);
        res.status(200).json(updatedGame);
    } catch (error) {
        console.error('Помилка оновлення гри:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteGame = async (req, res) => {
    try {
        await gameModel.deleteGame(req.params.id);
        res.status(204).end();
    } catch (error) {
        console.error('Помилка видалення гри:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getGameById,
    getAllGames,
    createGame,
    updateGame,
    deleteGame,
};
