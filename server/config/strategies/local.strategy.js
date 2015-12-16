var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/userModel');
var Role = require('../../models/roleModel');

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
            return done(null, false, req.flash('signupMessage', 'That email-address is already taken.'));
          } else {
            var user = new User();

            user.local.email = email;
            user.local.password = user.generateHash(password);

            Role.findOne({
              'name': 'Default',
            }, function(err, role) {
              if (err) {
                return done(err);
              } else {
                user.role = role._id;

                user.save(function(err) {
                  if (err) {
                    return done(err);
                  }

                  return done(null, user);
                });
              }
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
      var query = {
        'local.email': email,
      };

      User.findOne(query, function(err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, req.flash('loginMessage', 'No user with this username has been found!'));
        }

        if (!user.validPassword(password)) {
          return done(null, false, req.flash('loginMessage', 'The password you filled in is incorrect'));
        }

        return done(null, user);
      });
    }));
};

module.exports = strategy;
