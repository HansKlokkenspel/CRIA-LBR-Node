var authController = function(routeConfig) {
  var paramHandler = require('../config/utils/paramHandler')(routeConfig);
  var pages = routeConfig.pages;
  var viewsLocation = routeConfig.viewsLocation;

  // <------------------------------GET------------------------------>

  var login = function(req, res) {
    res.render(viewsLocation.login, {
      pages: pages,
      message: req.flash('loginMessage'),
    });
  };

  var signup = function(req, res) {
    res.render(viewsLocation.signup, {
      pages: pages,
      message: req.flash('signupMessage'),
    });
  };

  var logout = function(req, res) {
    req.logout();
    res.redirect('/');
  };

  return {
    login: login,
    signup: signup,
    logout: logout,
  };
};

module.exports = authController;
