require('dotenv').config({ path: '../.env' });

const express = require('express');
const app = express();
const http = require('http');
const handleRequest = require('./routes/endpointRouter');
const dbConnection = require("./config/database");

// Middleware для обробки CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Підключення ендпойнтроутера
app.use(handleRequest);

const PORT = process.env.PORT;
const ipAddress = process.env.DB_IP;

// Запуск сервера
const server = http.createServer(app);

server.listen(PORT, ipAddress, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Обробка закриття сервера
process.on('SIGINT', () => {
    dbConnection.end();
    console.log('Сервер зупинено');
    server.close(() => {
        process.exit(0);
    });
});
