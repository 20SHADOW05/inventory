const { use } = require('passport');
const pool = require('../config/db');

async function load_products(req, res){
    const selected_categories = [].concat(req.query.categories || []);

    let query = 'SELECT * FROM default_products';
    let params = [];

    if(selected_categories.length > 0){
        query += ' WHERE category = ANY($1)';
        params = [selected_categories];
    }

    const products = params.length > 0 ? await pool.query(query, params) : await pool.query('SELECT * FROM default_products');

    const categories = await pool.query('SELECT DISTINCT category FROM default_products');

    let userIn = false;
    if(req.user){
        userIn = true;
    }
    
    res.render('products' , { categories: categories.rows , products: products.rows , selected_categories , userIn});
}

async function search_products(req, res){
    const search_item = req.body.search?.split(' ')
                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                        .join(' ');
    const product = await pool.query('SELECT * FROM default_products WHERE name=$1' , [search_item]);
    res.render('search', { item: req.body.search , product : product.rowCount > 0 ? product.rows[0] : false });
}

async function add_products(req, res){
    const categories = await pool.query('SELECT DISTINCT category FROM default_products');
    res.render('add_product' , { categories: categories.rows });
}

module.exports = { load_products , search_products , add_products };