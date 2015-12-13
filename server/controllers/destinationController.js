var destinationController = function(routeConfig, middlewareController) {
  // <------------------------------GET------------------------------>
  var getDestinationIndex = function(req, res) {
    res.render(routeConfig.viewsLocation.destinations.getDestinationIndex, {
      nav: routeConfig.nav.structure,
      user: {
        name: req.user.displayName,
        image: req.user.image,
      },
    });
  };

  var getDestinationById = function(req, res) {
    res.render(routeConfig.viewsLocation.destinations.getDestinationById, {
      nav: routeConfig.nav.structure,
      user: {
        name: req.user.displayName,
        image: req.user.image,
      },
    });
  };

  var getAddDestination = function(req, res) {
    middlewareController.checkUserPrivileges(req, function(valid) {
      if (valid) {
        res.render(routeConfig.viewsLocation.destinations.getAddDestination, {
          nav: routeConfig.nav.structure,
          user: {
            name: req.user.displayName,
            image: req.user.image,
          },
        });
      } else {
        res.redirect('/');
      }
    });
  };

  var getEditDestinationById = function(req, res) {
    middlewareController.checkUserPrivileges(req, function(valid) {
      if (valid) {
        res.render(routeConfig.viewsLocation.destinations.getAddDestination, {
          nav: routeConfig.nav.structure,
          user: {
            name: req.user.displayName,
            image: req.user.image,
          },
        });
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

module.exports = destinationController;
