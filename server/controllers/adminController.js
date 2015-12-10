var Role = require('../models/roleModel');
var User = require('../models/userModel');

var adminController = function(routeConfig) {
  var middleware = function(req, res, next) {
    checkUserPrivileges(req, function(valid) {
      if (valid) {
        return next();
      } else {
        res.redirect('/');
      }
    });
  };

  var adminPanel = function(req, res) {
    res.render(routeConfig.viewsLocation.admin);
  };

  return {
    middleware: middleware,
    adminPanel: adminPanel,
  };
};

var checkUserPrivileges = function(req, cb) {
  var user = req.user;
  if (!user) {
    cb(false);
    return;
  }

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
