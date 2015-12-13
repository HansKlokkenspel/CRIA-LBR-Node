var Role = require('../models/roleModel');
var User = require('../models/userModel');

var middlewareController = function() {
  var middleware = function(req, res, next) {
    if (req.user) {
      console.log('The user is logged in, congratulations!');
      return next();
    }

    console.log('The user is not logged in!');
    res.redirect('/');
  };

  var adminMiddleware = function(req, res, next) {
    checkUserPrivileges(req, function(valid) {
      if (valid) {
        return next();
      } else {
        res.redirect('/');
      }
    });
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
        } else if (user.role.name == 'Admin') {
          console.log('You are an admin, congratulations!');
          cb(true);
          return;
        }

        cb(false);
        return;
      });
  };

  return {
    middleware: middleware,
    adminMiddleware: adminMiddleware,
    checkUserPrivileges: checkUserPrivileges,
  };
};

module.exports = middlewareController;
