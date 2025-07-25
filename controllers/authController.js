const bcrypt = require('bcryptjs');
const pool = require('../config/db');

function sign_up_Parse(req , res){
    res.render('signUp');
}

async function signUp_post(req , res , next) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [req.body.username, hashedPassword]);
      res.redirect("/login");
    } catch (error) {
        console.error(error);
        next(error);
    }
}

function loginParse(req , res){
    res.render('login');
}

module.exports = { sign_up_Parse , signUp_post , loginParse };