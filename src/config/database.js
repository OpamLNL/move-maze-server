const mysql = require('mysql2/promise');
require('dotenv').config();

const caCert = Buffer.from(process.env.DB_SSL_CA, 'base64').toString('utf-8');



// Створення пулу з'єднань
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        ca: caCert,
    }
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
