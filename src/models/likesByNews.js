const dbConnection = require('../config/database');

// Отримати всі лайки новини
const getLikesByNewsId = async (newsId) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'SELECT * FROM NewsLikes WHERE news_id = ?';
        dbConnection.query(sqlQuery, newsId, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// Додати лайк до новини
const addLikeToNews = async (newsId, userId) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'INSERT INTO NewsLikes (news_id, user_id) VALUES (?, ?)';
        dbConnection.query(sqlQuery, [newsId, userId], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve({ id: result.insertId, newsId, userId });
            }
        });
    });
};

// Видалити лайк з новини
const removeLikeFromNews = async (newsId, userId) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'DELETE FROM NewsLikes WHERE news_id = ? AND user_id = ?';
        dbConnection.query(sqlQuery, [newsId, userId], (error) => {
            if (error) {
                reject(error);
            } else {
                resolve({ newsId, userId });
            }
        });
    });
};

module.exports = {
    getLikesByNewsId,
    addLikeToNews,
    removeLikeFromNews,
};
