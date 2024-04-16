const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const gamesController = require('../controllers/gamesController');
const newsController = require('../controllers/newsController');
const tagsController = require('../controllers/tagsController');  // Додано контролер для тегів

// Роут для локального сервера
router.get('/', (req, res) => {
    res.send('Ласкаво просимо на локальний сервер!');
});

// Роути для користувачів
router.get('/api/users/getAll', usersController.getAllUsers);
router.get('/api/users/getUserById', usersController.getUserById);
router.post('/api/users/create', usersController.createUser);
router.put('/api/users/update/:id', usersController.updateUser);
router.delete('/api/users/delete/:id', usersController.deleteUser);

// Роути для адміністраторів користувачів
router.get('/admin/users', usersController.getAllUsers);
router.post('/admin/users/create', usersController.createUser);
router.put('/admin/users/update/:id', usersController.updateUser);
router.delete('/admin/users/delete/:id', usersController.deleteUser);

// Роути для адміністраторів ігор
router.get('/admin/games', gamesController.getAllGames);
router.post('/admin/games/create', gamesController.createGame);
router.put('/admin/games/update/:id', gamesController.updateGame);
router.delete('/admin/games/delete/:id', gamesController.deleteGame);

// Роути для адміністраторів новин
router.get('/admin/news', newsController.getAllNews);
router.post('/admin/news/create', newsController.createNews);
router.put('/admin/news/update/:id', newsController.updateNews);
router.delete('/admin/news/delete/:id', newsController.deleteNews);

// Роути для адміністраторів тегів
router.get('/admin/tags', tagsController.getAllTags);
router.post('/admin/tags/create', tagsController.createTag);
router.put('/admin/tags/update/:id', tagsController.updateTag);
router.delete('/admin/tags/delete/:id', tagsController.deleteTag);

// Роути для адміністраторів коментарів (припускаючи, що є контролер для коментарів)
router.get('/admin/comments', commentsController.getAllComments);
router.post('/admin/comments/create', commentsController.createComment);
router.put('/admin/comments/update/:id', commentsController.updateComment);
router.delete('/admin/comments/delete/:id', commentsController.deleteComment);

// Роути для адміністраторів лайків (припускаючи, що є контролер для лайків)
router.get('/admin/likes', likesController.getAllLikes);
router.post('/admin/likes/add', likesController.addLike);
router.delete('/admin/likes/remove/:id', likesController.removeLike);

// Роути для ігор
router.get('/api/games/getAll', gamesController.getAllGames);
router.get('/api/games/getGameById/:id', gamesController.getGameById);
router.post('/api/games/create', gamesController.createGame);
router.put('/api/games/update/:id', gamesController.updateGame);
router.delete('/api/games/delete/:id', gamesController.deleteGame);

// Роути для новин
router.get('/api/news/getAll', newsController.getAllNews);
router.get('/api/news/getById/:id', newsController.getNewsById);
router.post('/api/news/create', newsController.createNews);
router.put('/api/news/update/:id', newsController.updateNews);
router.delete('/api/news/delete/:id', newsController.deleteNews);

// Роути для лайків новин
router.get('/api/newsLikes/getLikesByNewsId/:newsId', likeByNewsController.getLikesByNewsId);
router.post('/api/newsLikes/addLike', likeByNewsController.addLikeToNews);
router.delete('/api/newsLikes/removeLike/:id', likeByNewsController.removeLikeFromNews);

// Роути для тегів
router.get('/api/tags/getAll', tagsController.getAllTags);
router.get('/api/tags/getById/:id', tagsController.getTagById);
router.post('/api/tags/create', tagsController.createTag);
router.put('/api/tags/update/:id', tagsController.updateTag);
router.delete('/api/tags/delete/:id', tagsController.deleteTag);

module.exports = router;
