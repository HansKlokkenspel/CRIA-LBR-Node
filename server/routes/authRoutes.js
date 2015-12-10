var express = require('express');
var passport = require('passport');
var authRouter = express.Router();

var router = function(routeConfig) {
  var authController = require('../controllers/authController')();

  authRouter.route('/signup')
    .post(passport.authenticate('local-signup', {
      successRedirect: '/user/profile',
      failureRedirect: '/',
    }));

  authRouter.route('/signup')
    .get(authController.signup);

  authRouter.route('/login')
    .post(passport.authenticate('local-login', {
      successRedirect: '/user/profile',
      failureRedirect: '/',
    }));

  authRouter.route('/login')
    .get(authController.login);

  authRouter.route('/google')
    .get(passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
    }));

  authRouter.route('/google/callback')
    .get(passport.authenticate('google', {
      successRedirect: '/user/profile',
      failure: '/',
    }));

  authRouter.route('/facebook')
    .get(passport.authenticate('facebook', {
      scope: ['email'],
    }));

  authRouter.route('/facebook/callback')
    .get(passport.authenticate('facebook', {
      successRedirect: '/user/profile',
      failure: '/',
    }));

  authRouter.route('/logout').get(authController.logout);

  return authRouter;
};

module.exports = router;
