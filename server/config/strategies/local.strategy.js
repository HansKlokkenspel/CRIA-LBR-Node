var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/userModel');

var strategy = function() {
  passport.use('local-signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    function(req, email, password, done) {
      process.nextTick(function() {
        var query = {
          'local.email': email,
        };

        User.findOne(query, function(err, user) {
          if (err) {
            return done(err);
          }

          if (user) {
            console.log('username has already been taken');
            return done(null, false);
          } else {
            var user = new User();

            user.local.email = email;
            user.local.password = user.generateHash(password);

            user.save(function(err) {
              if (err) {
                throw err;
              }

              return done(null, user);
            });
          }
        });
      });
    }));

  passport.use('local-login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    function(req, email, password, done) {
      console.log(email);
      console.log(password);
      var query = {
        'local.email': email,
      };

      User.findOne(query, function(err, user) {
        if (err) {
          return done(err);
        }

        console.log(user);

        if (!user) {
          console.log('User is not found!');
          return done(null, false);
        }

        if (!user.validPassword(password)) {
          console.log('The password is invalid!');
          return done(null, false);
        }

        return done(null, user);
      });
    }));
};

module.exports = strategy;
