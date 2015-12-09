var Role = require('../models/roleModel');
var User = require('../models/userModel');

var adminController = function() {
  var middleware = function(req, res, next) {
    if (req.user && checkUserPrivileges(req.user)) {
      return next();
    }

    console.log('The user is not logged in!');
    res.redirect('/');
  };

  var adminHome = function(req, res) {
    res.render('adminPanel');
  };

  return {
    middleware: middleware,
    adminHome: adminHome,
  };
};

var checkUserPrivileges = function(user) {
  User.findOne({
      'local.email': user.local.email,
    }).populate('role')
    .exec(function(err, user) {
      if (err) {
        console.log('Something went wrong with getting the user object! : ' + err);
        return false;
      } else if (user.role.roleName == 'Admin') {
        console.log('You are an admin, congratulations!');
        return true;
      }

      return false;
    });
};

module.exports = adminController;
