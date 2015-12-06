var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

var strategy = function() {
  passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
    },
    function(username, password, done) {
      var url = 'mongodb://localhost:27017/libraryApp';
      mongodb.connect(url, function(err, db) {
        var collection = db.collection('users');
        collection.findOne({
          username: username,
        }, function(err, results) {
          if (results.password == password) {
            var user = results;
            done(null, user);
          } else {
            done(null, false, {
              message: 'bad password',
            });
          }
        });
      });
    }));
};

module.exports = strategy;
