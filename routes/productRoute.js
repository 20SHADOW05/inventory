const { Router } = require('express');
const productRouter = Router();

const { load_products, search_products, add_products } = require('../controllers/productController');

productRouter.get('/', load_products);
productRouter.post('/search', search_products);
productRouter.get('/add_product' , add_products);

module.exports = { productRouter };