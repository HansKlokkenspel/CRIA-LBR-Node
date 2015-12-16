var Destination = require('../models/destinationModel');
var ObjectId = require('mongodb').ObjectID;

var destinationController = function(routeConfig, middlewareController) {
  var paramHandler = require('../config/utils/paramHandler')(routeConfig);

  // <------------------------------GET------------------------------>
  var getDestinationIndex = function(req, res) {
    addRenderParams(req, paramHandler, function(params) {
      res.render(routeConfig.viewsLocation.destinations.getDestinationIndex, params);
    });
  };

  var getDestinationById = function(req, res) {
    var id = new ObjectId(req.params.id);
    addRenderParams(req, paramHandler, function(params) {
      res.render(routeConfig.viewsLocation.destinations.getDestinationById, params);
    }, id);
  };

  var getAddDestination = function(req, res) {
    middlewareController.checkUserPrivileges(req, function(valid) {
      if (valid) {
        res.render(routeConfig.viewsLocation.destinations.getAddDestination,
          paramHandler.getDefaultParams(req));
      } else {
        res.redirect('/');
      }
    });
  };

  var getEditDestinationById = function(req, res) {
    middlewareController.checkUserPrivileges(req, function(valid) {
      if (valid) {
        res.render(routeConfig.viewsLocation.destinations.getAddDestination,
          paramHandler.getDefaultParams(req));
      } else {
        res.redirect('/');
      }
    });
  };

  // <------------------------------POST------------------------------>

  var addDestination = function(req, res) {
    middlewareController.checkUserPrivileges(req, function(valid) {
      // if (valid) {} else {}
    });
  };

  var editDestinationById = function(req, res) {
    middlewareController.checkUserPrivileges(req, function(valid) {
      // if (valid) {} else {}
    });
  };

  return {
    getDestinationIndex: getDestinationIndex,
    getDestinationById: getDestinationById,
    addDestination: addDestination,
    getAddDestination: getAddDestination,
    getEditDestinationById: getEditDestinationById,
    editDestinationById: editDestinationById,
  };
};

var addRenderParams = function(req, paramHandler, cb, id) {
  var defaultParams = paramHandler.getDefaultParams(req);

  console.log(id);

  if (typeof id !== 'undefined') {
    Destination.findOne({
      _id: id,
    }, function(err, result) {
      populateDestination(result, function(params) {
        Object.assign(params, defaultParams);
        cb(params);
      });
    });
  } else {
    Destination.find(function(err, result) {
      populateDestination(result, function(params) {
        Object.assign(params, defaultParams);
        cb(params);
      });
    });
  }
};

var populateDestination = function(result, cb) {
  Destination.populate(result, {
    path: 'hotels',
  }, function(err, dest) {
    var params = {
      destinations: dest,
    };
    cb(params);
  });
};

module.exports = destinationController;
