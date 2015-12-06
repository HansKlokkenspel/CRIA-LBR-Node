var Role = require('../../models/roleModel');
var User = require('../../models/userModel');

var dbSeed = function() {
  console.log('Seeding database');

  Role.findOne({
    'roleName': 'Default',
  }, function(err, role) {
    if (!role) {
      var newRole = new Role();
      newRole.roleName = 'Default';
      newRole.save();
    }
  });

  User.findOne({
    'local.email': 'admin@lbr.nl',
  }, function(err, user) {
    if (!user) {
      var role = Role.findOne({
        'roleName': 'Default',
      });

      var newUser = new User();
      newUser.local.email = 'admin@lbr.nl';
      newUser.local.password = newUser.generateHash('admin');
      newUser.role_id = role._id;

      console.log(role);

      newUser.save();
    }
  });
};

module.exports = dbSeed;
