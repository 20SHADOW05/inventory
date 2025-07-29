const express = require('express');
const session = require("express-session");
const app = express();
const passport = require("passport")
const path = require('node:path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

require('./config/passport');

const { indexRouter } = require('./routes/indexRoute');
const { authRouter } = require('./routes/authRoute');
const { productRouter } = require('./routes/productRouter');

app.use(express.static('public'));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/auth' , authRouter);
app.use('/products', productRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT);