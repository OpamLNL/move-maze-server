const mysql = require('mysql2/promise');
require('dotenv').config();

// Створення пулу з'єднань
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Функція для виконання запитів
async function query(sql, params) {
    const [results] = await pool.query(sql, params);
    return results;
}

// Функція для закриття пулу з'єднань
async function closePool() {
    await pool.end();
}

module.exports = {
    query,
    closePool
};
