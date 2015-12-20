var Role = require('../../models/roleModel');
var User = require('../../models/userModel');
var Arrangement = require('../../models/arrangementModel');
var Hotel = require('../../models/hotelModel');
var Booking = require('../../models/bookingModel');
var Destination = require('../../models/destinationModel');
var Payment = require('../../models/paymentModel');
var Country = require('../../models/countryModel');

var staticData = require('./staticData')();

var dbSeed = function () {
    console.log('Seeding database');

    User.findOne({
        'local.email': 'admin@lbr.nl',
    }, function (err, result) {
        if (err) {
            return err;
        }

        if (!result) {
            createUser('admin@lbr.nl', 'admin', 'Admin');
        }
    });

    User.findOne({
        'local.email': 'user@lbr.nl',
    }, function (err, result) {
        if (err) {
            return err;
        }

        if (!result) {
            createUser('user@lbr.nl', 'user', 'Default');
        }
    });

    Country.find(function (err, result) {
        if (err) {
            return err;
        }

        if (result.length < 1) {
            console.log('creating countries');
            var countries = staticData.generateCountries(7);

            for (var i = 0; i < countries.length; i++) {
                var country = countries[i];
                saveCountry(country);
            }
        }
    });

    var saveCountry = function (country) {
        country.save(function (err, result) {
            saveObj(result);
        });
    };

    var saveObj = function (objToSave) {
        for (var key in objToSave) {
            if (Array.isArray(objToSave[key])) {
                for (var i = 0; i < objToSave[key].length; i++) {
                    if ('_id' in objToSave[key][i]) {
                        objToSave[key][i].save(function (err, result) {
                            if (result) {
                                saveObj(result);
                            }
                        });
                    }
                }
            }
        }
    };
};


var createUser = function (email, password, roleName) {
    var newUser = new User();
    newUser.local.email = email;
    newUser.local.password = newUser.generateHash(password);

    Role.findOne({
        'name': roleName,
    }, function (err, role) {
        if (role) {
            newUser.role = role._id;
            newUser.save();
        } else {
            createRole(roleName, function (newRole) {
                newUser.role = newRole._id;
                newUser.save();
            });
        }
    });
};

var createRole = function (name, cb) {
    var newRole = new Role();
    newRole.name = name;
    newRole.save(function (err, result) {
        if (!err) {
            cb(result);
        }
    });
};

module.exports = dbSeed;
