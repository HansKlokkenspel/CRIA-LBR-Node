var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/userModel');

var strategy = function() {
  passport.use(new FacebookStrategy({
      clientID: '183209818694032',
      clientSecret: '24312e9ce060e8b0e5a133122ace5d85',
      callbackURL: 'http://localhost:8000/auth/facebook/callback',
      passReqToCallback: true,
    },
    function(req, accessToken, refreshToken, profile, done) {
      var query = {
        'facebook.id': profile.id
      };

      User.findOne(query, function(error, user) {
        if (user) {
          console.log('A user under this name has already been found');
          done(null, user);
        } else {
          console.log('User has not yet been found, creating new user');

          var user = new User;

          user.displayName = profile.displayName;

          user.facebook = {};
          user.facebook.id = profile.id;
          user.facebook.token = accessToken;

          user.save();

          done(null, user);
        }
      });

    }));
};

module.exports = strategy;
