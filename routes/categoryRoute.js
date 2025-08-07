const { Router } = require('express');
const { load_categories, insertCategory } = require('../controllers/categoryController');
const categoryRouter = Router();

categoryRouter.get('/' , load_categories);
categoryRouter.post('/', insertCategory);

module.exports = { categoryRouter };