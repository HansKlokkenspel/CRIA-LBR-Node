var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongodb = require('mongodb').MongoClient;
var User = require('../../models/userModel');

var saveGoogleUser = function(user, profile, accessToken) {
  user.email = profile.emails[0].value;
  user.image = profile._json.image.url;
  user.displayName = profile.displayName;

  user.google = {};
  user.google.id = profile.id;
  user.google.token = accessToken;

  user.save();
};

var strategy = function() {
  passport.use(new GoogleStrategy({
      clientID: '925592194633-nf0301otnqviv3hcc53cfpho3rsr4muk.apps.googleusercontent.com',
      clientSecret: 'HrQe00hj5hnLjQaptoEJ75-g',
      callbackURL: 'http://localhost:8000/auth/google/callback',
    },
    function(req, accessToken, refreshToken, profile, done) {
      if (req.user) {
        if (req.user.facebook) {
          console.log('Adding facebook strategy to a facebook account');
          var query = {
            'facebook.id': req.user.facebook.id,
          };
        } else if (req.user.local) {
          console.log('Adding google strategy to a local account');
          var query = {
            'userId': req.user.local.userId,
          };
        }

        User.findOne(query, function(err, user) {
          saveGoogleUser(user, profile, accessToken);
          done(null, user);
        });
      } else {
        var query = {
          'google.id': profile.id,
        };

        User.findOne(query, function(err, user) {
          if (user) {
            console.log('Already found a user under this name');
            done(null, user);
          } else {
            console.log('Did not find a user, creating new user');
            var user = new User;
            saveGoogleUser(user, profile, accessToken);
            done(null, user);
          }
        });
      }
    }));
};

module.exports = strategy;
