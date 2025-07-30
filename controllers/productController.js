const pool = require('../config/db');

async function load_products(req, res){
    const categories = await pool.query('SELECT DISTINCT category FROM default_products');
    const products = await pool.query('SELECT * FROM default_products');
    res.render('products' , { categories: categories.rows , products: products.rows });
}

module.exports = { load_products }