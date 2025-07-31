const { Router } = require('express');
const productRouter = Router();

const { load_products, search_products } = require('../controllers/productController');

productRouter.get('/', load_products);
productRouter.post('/search', search_products);

module.exports = { productRouter };