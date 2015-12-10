var Role = require('../../models/roleModel');
var User = require('../../models/userModel');

var dbSeed = function() {
  console.log('Seeding database');

  Role.findOne({
    'roleName': 'Default',
  }, function(err, role) {
    if (!err) {
      createRole(role, 'Default');
    } else {
      console.log('Something went wrong when inserting a role: ' + error);
    }
  });

  Role.findOne({
    'roleName': 'Admin',
  }, function(err, role) {
    if (!err) {
      createRole(role, 'Admin');
    } else {
      console.log('Something went wrong when inserting a role: ' + error);
    }
  });

  User.findOne({
    'local.email': 'admin@lbr.nl',
  }, function(err, user) {
    if (!err) {
      createUser(user, 'admin@lbr.nl', 'admin', 'Admin');
    } else {
      console.log('Something went wrong inserting a user:' + err);
    }
  });

  User.findOne({
    'local.email': 'user@lbr.nl',
  }, function(err, user) {
    if (!err) {
      createUser(user, 'user@lbr.nl', 'user', 'Default');
    } else {
      console.log('Something went wrong inserting a user:' + err);
    }
  });
};

var createUser = function(user, email, password, role) {
  if (!user) {
    var newUser = new User();
    newUser.local.email = email;
    newUser.local.password = newUser.generateHash(password);

    Role.findOne({
      'roleName': role,
    }, function(err, role) {
      newUser.role = role._id;

      newUser.save(function(err) {
        if (err) {
          console.log('Something went wrong when creating a user! : ' + err);
        }
      });
    });
  }
};

var createRole = function(role, roleName) {
  if (!role) {
    var newRole = new Role();
    newRole.roleName = roleName;
    newRole.save();
  }
};

module.exports = dbSeed;
