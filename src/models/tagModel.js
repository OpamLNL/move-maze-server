const dbConnection = require('../config/database');

// Отримати всі теги
const getAllTags = async () => {
    const sqlQuery = 'SELECT * FROM tags';
    return dbQuery(sqlQuery);
};

// Створити новий тег
const createTag = async (tagData) => {
    const sqlQuery = 'INSERT INTO tags SET ?';
    return dbQuery(sqlQuery, [tagData]);
};

// Оновити тег
const updateTag = async (tagId, tagData) => {
    const sqlQuery = 'UPDATE tags SET ? WHERE id = ?';
    return dbQuery(sqlQuery, [tagData, tagId]);
};

// Видалити тег
const deleteTag = async (tagId) => {
    const sqlQuery = 'DELETE FROM tags WHERE id = ?';
    return dbQuery(sqlQuery, [tagId]);
};

// Допоміжна функція для виконання запитів до бази даних
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
    getAllTags,
    createTag,
    updateTag,
    deleteTag
};
