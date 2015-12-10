var authController = function() {
  var login = function(req, res) {
    res.render('auth/login');
  };

  var signup = function(req, res) {
    res.render('auth/signup');
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
