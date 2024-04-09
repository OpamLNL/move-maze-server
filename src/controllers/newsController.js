const newsModel = require('../models/newsModel');

const getAllNews = async (req, res) => {
    try {
        const news = await newsModel.getAllNews();
        res.json(news);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const createNews = async (req, res) => {
    try {
        const news = await newsModel.createNews(req.body);
        res.status(201).json(news);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateNews = async (req, res) => {
    try {
        const news = await newsModel.updateNews(req.params.id, req.body);
        res.json(news);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteNews = async (req, res) => {
    try {
        const news = await newsModel.deleteNews(req.params.id);
        res.json(news);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getAllNews,
    createNews,
    updateNews,
    deleteNews
};
