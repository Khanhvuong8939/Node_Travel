const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in Article Model
let User = require('../models/user');

//express-validator
const {check, validationResult} = require('express-validator/check');

// Register Form

router.get('/register', function (req, res) {
    res.render('register', {
        title: 'Register'
    });
});

//Login Form
router.get('/login', function (req, res) {
    res.render('login', {
        title: 'Login'
    });
});

//Login process
//TODO: Need to check null(username/password)
router.post('/login', function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});


router.post('/register', function (req, res) {
    let newUser = new User();
    newUser.name = req.body.name;
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) {
                console.log(err);
            } else {
                newUser.password = hash;
                console.log('Hash pwd: ' + newUser.password);
                console.log('DATA: ' + newUser)
                // newUser.save(function (err) {
                //     if (err) {
                //         console.log(err)
                //     } else {
                //         console.log('submitted: ' + newUser.username);
                //         req.flash('success', 'Welcome to my website <3');
                //         res.render('users/register', {
                //             title: 'Register'
                //         });
                //     }
                // })
                req.flash('success', 'register successful');
                res.render('register', {
                    title: 'Register'
                });
            }
        });
    });
});

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register'
    })
});

router.get('/logout', function (req, res) {
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/users/login');
});


module.exports = router;