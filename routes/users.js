const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const { reviewSchema } = require('../schemas');
const users = require('../controllers/users')
const user = require('../models/user');
const isLoggedIn = require('../middleware');


router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.registerUser))

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/login',
        keepSessionInfo: true
    }), users.login)

router.get('/logout', users.logout)

module.exports = router