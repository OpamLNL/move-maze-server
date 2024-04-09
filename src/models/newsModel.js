const dbConnection = require('../config/database');

// Отримати всі новини
const getAllNews = async () => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'SELECT * FROM News';
        dbConnection.query(sqlQuery, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// Створити нову новину
const createNews = async (newsData) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'INSERT INTO News SET ?';
        dbConnection.query(sqlQuery, newsData, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve({ id: result.insertId, ...newsData });
            }
        });
    });
};

// Оновити новину
const updateNews = async (newsId, newData) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'UPDATE News SET ? WHERE id = ?';
        dbConnection.query(sqlQuery, [newData, newsId], (error) => {
            if (error) {
                reject(error);
            } else {
                resolve({ id: newsId, ...newData });
            }
        });
    });
};

// Видалити новину
const deleteNews = async (newsId) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'DELETE FROM News WHERE id = ?';
        dbConnection.query(sqlQuery, newsId, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve({ id: newsId });
            }
        });
    });
};

module.exports = {
    getAllNews,
    createNews,
    updateNews,
    deleteNews,
};
