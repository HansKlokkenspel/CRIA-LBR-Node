var Role = require('../models/roleModel');
var User = require('../models/userModel');

var adminController = function() {
  var middleware = function(req, res, next) {
    checkUserPrivileges(req.user, function(valid) {
      if (valid) {
        return next();
      } else {
        res.redirect('/');
      }
    });
  };

  var adminHome = function(req, res) {
    res.render('admin/adminPanel');
  };

  return {
    middleware: middleware,
    adminHome: adminHome,
  };
};

var checkUserPrivileges = function(user, cb) {
  User.findOne({
      'local.email': user.local.email,
    }).populate('role')
    .exec(function(err, user) {
      if (err) {
        console.log('Something went wrong with getting the user object! : ' + err);
        cb(false);
        return;
      } else if (user.role.roleName == 'Admin') {
        console.log('You are an admin, congratulations!');
        cb(true);
        return;
      }

      cb(false);
      return;
    });
};

module.exports = adminController;
