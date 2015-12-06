var passport = require('passport');
var session = require('express-session');

var passportConfig = function(app) {
  app.use(session({secret: 'lbr'}));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  require('./strategies/local.strategy')();
  require('./strategies/google.strategy')();
  require('./strategies/facebook.strategy')();
};

module.exports = passportConfig;
