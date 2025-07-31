const { Router } = require('express');
const { load_categories } = require('../controllers/categoryController');
const categoryRouter = Router();

categoryRouter.get('/' , load_categories);

module.exports = { categoryRouter };