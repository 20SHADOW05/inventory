const { Router } = require('express');
const productRouter = Router();

const { load_products } = require('../controllers/productController');

productRouter.get('/', load_products);

module.exports = { productRouter };