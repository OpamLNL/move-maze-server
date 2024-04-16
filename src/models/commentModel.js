const dbConnection = require('../config/database');

// Отримати всі коментарі для конкретного об'єкта
const getCommentsByTypeAndId = async (type, id) => {
    const sqlQuery = `SELECT * FROM comments WHERE commentable_type = ? AND commentable_id = ?`;
    return dbQuery(sqlQuery, [type, id]);
};

// Створити коментар
const createComment = async (commentData) => {
    const sqlQuery = 'INSERT INTO comments SET ?';
    return dbQuery(sqlQuery, [commentData]);
};

// Оновити коментар
const updateComment = async (commentId, commentData) => {
    const sqlQuery = 'UPDATE comments SET ? WHERE id = ?';
    return dbQuery(sqlQuery, [commentData, commentId]);
};

// Видалити коментар
const deleteComment = async (commentId) => {
    const sqlQuery = 'DELETE FROM comments WHERE id = ?';
    return dbQuery(sqlQuery, [commentId]);
};

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
    getCommentsByTypeAndId,
    createComment,
    updateComment,
    deleteComment
};
