var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongodb = require('mongodb').MongoClient;
var User = require('../../models/userModel');

var strategy = function() {
  passport.use(new GoogleStrategy({
      clientID: '925592194633-nf0301otnqviv3hcc53cfpho3rsr4muk.apps.googleusercontent.com',
      clientSecret: 'HrQe00hj5hnLjQaptoEJ75-g',
      callbackURL: 'http://localhost:8000/auth/google/callback',
    },
    function(req, accessToken, refreshToken, profile, done) {
      console.log('trying to resolve google user');

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
          user.email = profile.emails[0].value;
          user.image = profile._json.image.url;
          user.displayName = profile.displayName;

          user.google = {};
          user.google.id = profile.id;
          user.google.token = accessToken;

          user.save();
          done(null, user);
        }
      });

    }));
};

module.exports = strategy;
