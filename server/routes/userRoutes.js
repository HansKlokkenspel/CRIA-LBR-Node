var express = require('express');
var mongodb = require('mongodb').MongoClient;
var userRouter = express.Router();

var router = function(nav) {
  userRouter.use('/', function(req, res, next) {
    if (!req.user) {
      res.redirect('/');
    }

    next();
  });

  userRouter.route('/profile')
    .get(function(req, res) {
      res.render('profile', {
        nav: nav,
        user: {
          name: req.user.displayName,
          image: req.user.image,
        },
      });
    });

  return userRouter;
};

module.exports = router;
