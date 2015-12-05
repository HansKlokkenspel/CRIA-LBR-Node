var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

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
            res.redirect('/auth/profile');
          });
        });
      });
    });

  authRouter.route('/signIn')
    .post(passport.authenticate('local', {
      failureRedirect: '/',
    }), function(req, res) {
      res.redirect('/auth/profile');
    });

  authRouter.route('/profile')
    .all(function(req, res, next) {
      if (!req.user) {
        res.redirect('/');
      }

      next();
    })
    .get(function(req, res) {
      res.json(req.user);
    });

  authRouter.route('/google/callback')
    .get(passport.authenticate('google', {
      successRedirect: '/auth/profile',
      failure: '/',
    }));

  authRouter.route('/google')
    .get(passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ]
    }));

  authRouter.route('/profile')
    .get(function(req, res) {
      console.log('getting profile');
      res.render('profile', {
        user: {
          name: req.user.displayName,
          image: req.user._json.image.url
        }
      });
    });

  return authRouter;
};

module.exports = router;
