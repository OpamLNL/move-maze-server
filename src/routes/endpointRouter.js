const express = require('express');
const path = require('path');
const router = express.Router();
const usersController = require('../controllers/usersController');
const gamesController = require('../controllers/gamesController');

const app = express();


app.use(express.static(path.join(__dirname, 'public')));

// Роут для локального сервера
router.get('/', (req, res) => {
    res.send('Ласкаво просимо на локальний сервер!');
});

// Роути для користувачів
router.get('/api/users/getUserById', usersController.getUserById);
router.get('/api/users/getAll', usersController.getAllUsers);
router.post('/api/users-create/post', usersController.createUser);
router.put('/api/users/update', usersController.updateUser);
router.delete('/api/users/delete', usersController.deleteUser);

// Роут для отримання активних користувачів
router.get('/api/active-users/get', usersController.getActiveUsers);

// Роути для ігор
router.get('/api/games/getGameById', gamesController.getGameById);
router.get('/api/games/getAll', gamesController.getAllGames);
router.post('/api/games-create/post', gamesController.createGame);
router.put('/api/games/update', gamesController.updateGame);
router.delete('/api/games/delete', gamesController.deleteGame);

module.exports = router;
