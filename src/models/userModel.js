const dbConnection = require('../config/database');



const getUserByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'SELECT * FROM users WHERE email = ?';
        dbConnection.query(sqlQuery, [email], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]); // Повертаємо перший знайдений результат (або null)
            }
        });
    });
};


const getUserById = async (userId) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'SELECT * FROM users WHERE id = ?';
        dbConnection.query(sqlQuery, userId, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]); // Повертаємо перший знайдений результат (або null)
            }
        });
    });
};


// Отримати всіх користувачів
const getAllUsers = async () => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'SELECT * FROM users';
        dbConnection.query(sqlQuery, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// Створити нового користувача
const jwt = require('jsonwebtoken');

const createUser = async (userData) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'INSERT INTO users SET ?';
        dbConnection.query(sqlQuery, userData, (error, result) => {
            if (error) {
                reject(error);
            } else {
                // Припустимо, що в userData не міститься пароль, або він хешований
                const userWithoutPassword = { id: result.insertId, ...userData };
                // Генерація токена
                const token = jwt.sign(
                    { id: userWithoutPassword.id },
                    process.env.JWT_SECRET_KEY, // використовуйте секретний ключ з вашого конфігураційного файлу або змінної середовища
                    { expiresIn: '24h' }
                );

                resolve({ user: userWithoutPassword, token });
            }
        });
    });
};

// Оновити інформацію про користувача
const updateUser = async (userId, newData) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'UPDATE users SET ? WHERE id = ?';
        dbConnection.query(sqlQuery, [newData, userId], (error) => {
            if (error) {
                reject(error);
            } else {
                resolve({ id: userId, ...newData });
            }
        });
    });
};

// Видалити користувача
const deleteUser = async (userId) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'DELETE FROM users WHERE id = ?';
        dbConnection.query(sqlQuery, userId, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve({ id: userId });
            }
        });
    });
};

const getActiveUsers = async () => {
    return new Promise((resolve, reject) => {
        // Визначення поточного часу
        const currentTime = new Date();
        // Віднімання 15 хвилин від поточного часу
        const activeTimePeriod = new Date(currentTime.getTime() - (15 * 60 * 1000));

        const sqlQuery = `SELECT * FROM users WHERE last_visit >= ?`;
        dbConnection.query(sqlQuery, [activeTimePeriod.toISOString()], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};


module.exports = {
    getUserByEmail,
    getUserById,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getActiveUsers,
};
