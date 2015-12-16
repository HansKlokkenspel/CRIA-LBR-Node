var express = require('express');
var passport = require('passport');
var authRouter = express.Router();

var router = function(routeConfig, middlewareController) {
  var authController = require('../controllers/authController')(routeConfig);

  var pages = routeConfig.pages;

  // <------------------------------GET------------------------------>

  authRouter.route('/signup')
    .get(authController.signup);

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
      successRedirect: pages.profile.getIndex,
      failure: '/',
    }));

  authRouter.route('/facebook')
    .get(passport.authenticate('facebook', {
      scope: ['email'],
    }));

  authRouter.route('/facebook/callback')
    .get(passport.authenticate('facebook', {
      successRedirect: pages.profile.getIndex,
      failure: '/',
    }));

  authRouter.route('/logout').get(authController.logout);

  // <------------------------------POST------------------------------>

  authRouter.route('/login')
    .post(passport.authenticate('local-login', {
      successRedirect: pages.profile.getIndex,
      failureRedirect: pages.login,
      failureFlash: true,
    }));

  authRouter.route('/signup')
    .post(passport.authenticate('local-signup', {
      successRedirect: pages.profile.getIndex,
      failureRedirect: pages.signup,
      failureFlash: true,
    }));

  return authRouter;
};

module.exports = router;
