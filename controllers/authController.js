const bcrypt = require('bcryptjs');
const pool = require('../config/db');

function sign_up_Parse(req , res){
    res.render('signUp');
}

async function signUp_post(req , res , next) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const userResult = await client.query("INSERT INTO users (username,display_name, password) VALUES ($1, $2, $3) RETURNING id", [req.body.username,req.body.display_name, hashedPassword]);
      const userId = userResult.rows[0].id;

      const categoriesResult = await client.query("SELECT DISTINCT category from default_products");
      const categoryMap = {};

      for(const row of categoriesResult.rows){
        const insertCategories = await client.query("INSERT INTO user_categories (user_id,category) VALUES($1,$2) RETURNING category_id" , [userId, row.category]);
        categoryMap[row.category] = insertCategories.rows[0].category_id;
      }

      const productsResult = await client.query('SELECT * FROM default_products');

      for(const row of productsResult.rows){
        await client.query("INSERT INTO user_products (user_id, category_id, product_name, price, image_path) VALUES($1, $2 ,$3 ,$4 ,$5)", 
          [ userId, categoryMap[row.category], row.name, row.price, row.image_path ]
        );
      }

      await client.query('COMMIT');
      res.redirect("/auth/login");

    } catch (error) {
        await client.query('ROLLBACK');
        console.error(error);
        next(error);
    } finally {
        client.release();
    }
}

function loginParse(req , res){
    res.render('login');
}

async function usernameCheck(req , res){
    const { username } = req.query; // Extract username from URL parameter
  
  try {
    const { rows } = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [username]
    );
    
    // Return true if username exists, false if available
    res.json({ exists: rows.length > 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { sign_up_Parse , signUp_post , loginParse , usernameCheck };