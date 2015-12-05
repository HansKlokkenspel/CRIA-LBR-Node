var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongodb = require('mongodb').MongoClient;

var strategy = function() {
  passport.use(new GoogleStrategy({
      clientID: '925592194633-nf0301otnqviv3hcc53cfpho3rsr4muk.apps.googleusercontent.com',
      clientSecret: 'HrQe00hj5hnLjQaptoEJ75-g',
      callbackURL: 'http://localhost:8000/auth/google/callback'
    },
    function(req, accessToken, refreshToken, profile, done) {
      done(null, profile);
    }));
};

module.exports = strategy;
