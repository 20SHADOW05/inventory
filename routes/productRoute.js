const { Router } = require('express');
const productRouter = Router();

const { load_products, search_products, add_products, add_products_db } = require('../controllers/productController');

productRouter.get('/', load_products);
productRouter.post('/', add_products_db);
productRouter.post('/search', search_products);
productRouter.get('/add_product' , add_products);

module.exports = { productRouter };