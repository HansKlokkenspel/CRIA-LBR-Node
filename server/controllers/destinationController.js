var Destination = require('../models/destinationModel');

var destinationController = function(routeConfig, middlewareController) {
  var paramHandler = require('../config/utils/paramHandler')(routeConfig);

  // <------------------------------GET------------------------------>
  var getDestinationIndex = function(req, res) {
    renderStrategy(req, paramHandler, function(params) {
      res.render(routeConfig.viewsLocation.destinations.getDestinationIndex, params);
    });
  };

  var getDestinationById = function(req, res) {
    res.render(routeConfig.viewsLocation.destinations.getDestinationById,
      paramHandler.getDefaultParams(req));
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
      if (valid) {
        //allow post
      } else {
        //throw http error code
      }
    });
  };

  var editDestinationById = function(req, res) {
    middlewareController.checkUserPrivileges(req, function(valid) {
      if (valid) {
        //allow post
      } else {
        //throw http error code
      }
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

var renderStrategy = function(req, paramHandler, cb) {
  var defaultParams = paramHandler.getDefaultParams(req);
  Destination.find(function(err, result) {
    console.log(result);
    var params = {
      destinations: result,
    };

    Object.assign(params, defaultParams);
    cb(params);
  });
};

module.exports = destinationController;
