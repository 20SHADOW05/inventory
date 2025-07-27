const bcrypt = require('bcryptjs');
const pool = require('../config/db');

function sign_up_Parse(req , res){
    res.render('signUp');
}

async function signUp_post(req , res , next) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await pool.query("INSERT INTO users (username,display_name, password) VALUES ($1, $2, $3)", [req.body.username,req.body.display_name, hashedPassword]);
      res.redirect("/auth/login");
    } catch (error) {
        console.error(error);
        next(error);
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