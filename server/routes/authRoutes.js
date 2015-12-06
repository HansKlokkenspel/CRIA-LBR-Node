var express = require('express');
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');
var authRouter = express.Router();

var router = function(nav) {
  authRouter.route('/signUp')
    .post(function(req, res) {
      console.log(req.body);

      var url = 'mongodb://localhost:27017/libraryApp';
      mongodb.connect(url, function(err, db) {
        var collection = db.collection('users');
        var user = {
          username: req.body.username,
          password: req.body.password,
        };

        collection.insert(user, function(err, results) {
          req.login(results.ops[0], function() {
            res.redirect('/user/profile');
          });
        });
      });
    });

  authRouter.route('/signIn')
    .post(passport.authenticate('local', {
      failureRedirect: '/',
    }), function(req, res) {
      res.redirect('/user/profile');
    });

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

  return authRouter;
};

module.exports = router;
