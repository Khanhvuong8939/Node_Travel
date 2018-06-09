const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const config = require('./config/database');
const passport = require('passport');

const expressValidator = require('express-validator');
//Express Validator
const { check, validationResult } = require('express-validator/check');

// Init App
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())


// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Load static view in Public
app.use(express.static(path.join(__dirname, 'public')));

// Express Session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// Express Message Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    res.locals.errors = null;
    next();
});

//Express Validator
app.use(expressValidator());

// Passport config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
})

//Bring in model:
let User = require('./models/user');

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Home',
    })
});

// Route files
let users = require('./routes/users');
app.use('/users', users);

app.listen(3000, function () {
    console.log('Server start on port 3000...');
});