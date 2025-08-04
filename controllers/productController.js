const { use } = require('passport');
const pool = require('../config/db');

async function load_products(req, res){
    let userExists = req.user ? req.user.id : false;

    const selected_categories = [].concat(req.query.categories || []);

    let products,categories;
    if(userExists){
        let query = `SELECT up.user_id, up.product_id, up.product_name, uc.category, up.price, up.image_path
                    FROM user_products up
                    INNER JOIN user_categories uc
                    ON up.category_id = uc.category_id
                    WHERE up.user_id = $1`;
        let params = [userExists];

        if (selected_categories.length > 0) {
            const cat_ids_result = await pool.query(
                'SELECT category_id FROM user_categories WHERE user_id = $1 AND category = ANY($2)',
                [userExists, selected_categories]
            );

            const selected_categories_id = cat_ids_result.rows.map(row => row.category_id);

            query += ' AND up.category_id = ANY($2)';
            params.push(selected_categories_id);    
        }      

        categories = await pool.query('SELECT category FROM user_categories WHERE user_id=$1',[userExists])
        products = await pool.query(query, params);

    }

    else{
        let query = 'SELECT * FROM default_products';
        let params = [];

        if(selected_categories.length > 0){
            query += ' WHERE category = ANY($1)';
            params = [selected_categories];
        }

        categories = await pool.query('SELECT DISTINCT category FROM default_products');
        products = selected_categories.length > 0 ? await pool.query(query, params) : await pool.query('SELECT * FROM default_products');
    }

    res.render('products' , { categories: categories.rows , products: products.rows , selected_categories , userIn: userExists});
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