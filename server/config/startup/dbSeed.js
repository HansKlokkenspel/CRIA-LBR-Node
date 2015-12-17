var Role = require('../../models/roleModel');
var User = require('../../models/userModel');
var Arrangement = require('../../models/arrangementModel');
var Hotel = require('../../models/hotelModel');
var Booking = require('../../models/bookingModel');
var Destination = require('../../models/destinationModel');
var Payment = require('../../models/paymentModel');
var Country = require('../../models/countryModel');

var dbSeed = function() {
  console.log('Seeding database');

  // Role.findOne({
  //   'name': 'Default',
  // }, function(err, result) {
  //   if (err) {
  //     return err;
  //   }
  //
  //   if (!result) {
  //     createRole(result, 'Default');
  //   }
  // });
  //
  // Role.findOne({
  //   'name': 'Admin',
  // }, function(err, result) {
  //   if (err) {
  //     return err;
  //   }
  //
  //   if (!result) {
  //     createRole(result, 'Admin');
  //   }
  // });

  User.findOne({
    'local.email': 'admin@lbr.nl',
  }, function(err, result) {
    if (err) {
      return err;
    }

    if (!result) {
      createUser('admin@lbr.nl', 'admin', 'Admin');
    }
  });

  User.findOne({
    'local.email': 'user@lbr.nl',
  }, function(err, result) {
    if (err) {
      return err;
    }

    if (!result) {
      createUser('user@lbr.nl', 'user', 'Default');
    }
  });

  Country.findOne({
    'name': 'America',
  }, function(err, result) {
    if (err) {
      return err;
    }

    if (!result) {
      createCountry('America', 'Country of freedom', 'Los Angeles');
    }
  });

  Country.findOne({
    'name': 'Antillen'
  }, function(err, result) {
    if (err) {
      return err;
    }

    if (!result) {
      createCountry('Antillen', 'Country of thugs', 'Aruba');
    }
  });
};

var createArrangement = function(name, description, price, people, cb) {
  var newArrangement = new Arrangement();
  newArrangement.name = name;
  newArrangement.description = description;
  newArrangement.price = price;
  newArrangement.people = people;

  newArrangement.save(function(err, result) {
    if (!err) {
      cb(result);
      return;
    }
  });
};

var createDestination = function(name, description, cb) {
  var newDestination = new Destination();
  newDestination.name = name;
  newDestination.description = description;

  Hotel.findOne({
    'name': name,
  }, function(err, result) {
    if (!result) {
      createHotel(name, 'A super luxurious hotel', 9.7, function(newHotel) {
        newDestination.hotels.push(newHotel);
        if (newDestination.hotels.length === 3) {
          newDestination.save();
          cb(newDestination);
        }
      });

      createHotel('El grande ' + name, 'A luxurious hotel', 7.8, function(newHotel) {
        newDestination.hotels.push(newHotel);
        if (newDestination.hotels.length === 3) {
          newDestination.save();
          cb(newDestination);
        }
      });

      createHotel('The ' + name, 'A not so luxurious hotel', 6.9, function(newHotel) {
        newDestination.hotels.push(newHotel);
        if (newDestination.hotels.length === 3) {
          newDestination.save();
          cb(newDestination);
        }
      });
    }
  });
};

var createHotel = function(name, description, rating, cb) {
  var newHotel = new Hotel();
  newHotel.name = name;
  newHotel.description = description;
  newHotel.rating = rating;

  createArrangement('Full pension', 'Full pension for this hotel', 699, 4, function(newArrangement) {
    newHotel.arrangements.push(newArrangement);
    if (newHotel.arrangements.length === 3) {
      newHotel.save(function(err, result) {
        cb(newHotel);
      });
    }
  });

  createArrangement('Half pension', 'Half pension for this hotel', 349, 4, function(newArrangement) {
    newHotel.arrangements.push(newArrangement);
    if (newHotel.arrangements.length === 3) {
      newHotel.save(function(err, result) {
        cb(newHotel);
      });
    }
  });

  createArrangement('breakfast', 'Breakfast for this hotel', 49, 4, function(newArrangement) {
    newHotel.arrangements.push(newArrangement);
    if (newHotel.arrangements.length === 3) {
      newHotel.save(function(err, result) {
        cb(newHotel);
      });
    }
  });
};


var createCountry = function(name, description, destination) {
  var newCountry = new Country();
  newCountry.name = name;
  newCountry.description = description;

  Destination.findOne({
    'name': destination,
  }, function(err, result) {
    if (!result) {
      createDestination(destination, destination + ' bootifuru', function(newDestination) {
        newCountry.destinations.push(newDestination);
        if (newCountry.destinations.length === 3) {
          newCountry.save();
        }
      });

      createDestination(destination + ' other', 'Best destination ever', function(newDestination) {
        newCountry.destinations.push(newDestination);
        if (newCountry.destinations.length === 3) {
          newCountry.save();
        }
      });

      createDestination(destination + ' another after the other', 'Best destination ever', function(newDestination) {
        newCountry.destinations.push(newDestination);
        if (newCountry.destinations.length === 3) {
          newCountry.save();
        }
      });
    }
  });
};

var createUser = function(email, password, roleName) {
  var newUser = new User();
  newUser.local.email = email;
  newUser.local.password = newUser.generateHash(password);

  Role.findOne({
    'name': roleName,
  }, function(err, role) {
    if (role) {
      newUser.role = role._id;
      newUser.save();
    } else {
      createRole(roleName, function(newRole) {
        newUser.role = newRole._id;
        newUser.save();
      });
    }
  });
};

var createRole = function(name, cb) {
  var newRole = new Role();
  newRole.name = name;
  newRole.save(function(err, result) {
    if (!err) {
      cb(result);
    }
  });
};

var createPayment = function() {};
var createBooking = function() {};

module.exports = dbSeed;
