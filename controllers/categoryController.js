const pool = require('../config/db');

async function load_categories(req, res){
    const categories = await pool.query('SELECT DISTINCT category FROM default_products');
    res.render('category' , { categories: categories.rows });
}

module.exports = { load_categories };