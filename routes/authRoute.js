const { Router } = require('express');
const authRouter = Router();
const passport = require('passport')

const { sign_up_Parse , signUp_post , loginParse } = require('../controllers/authController');

authRouter.get('/signUp' , sign_up_Parse);

authRouter.post("/signUp", signUp_post);

authRouter.get('/login' , loginParse);

authRouter.post(
  '/login',
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

module.exports = { authRouter };