const express = require('express');
const session = require("express-session");
const app = express();
const passport = require("passport")
const path = require('node:path');

require('./config/passport');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.session());

const { indexRouter } = require('./routes/indexRoute');
const { authRouter } = require('./routes/authRoute');
const { productRouter } = require('./routes/productRoute');
const { categoryRouter } = require('./routes/categoryRoute');

app.use('/', indexRouter);
app.use('/auth' , authRouter);
app.use('/products', productRouter);
app.use('/categories' , categoryRouter);
app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT);