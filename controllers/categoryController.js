const pool = require('../config/db');

async function load_categories(req, res){
    let userExists = req.user ? req.user.id : false;
    let categories;
    if(userExists){
        categories = await pool.query('SELECT category FROM user_categories WHERE user_id=$1',[userExists]);
    }
    else{
        categories = await pool.query('SELECT DISTINCT category FROM default_products');
    }
    
    res.render('category' , { categories: categories.rows , userIn: userExists, user : req.user });
}

async function insertCategory(req, res){
    const category_name = req.body?.category_name;
    await pool.query('INSERT INTO user_categories(user_id, category) VALUES($1,$2)',[req.user.id , category_name]);
    res.redirect('/categories')
}

module.exports = { load_categories, insertCategory };