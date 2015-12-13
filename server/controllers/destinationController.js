var destinationController = function(routeConfig) {

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

  var addDestination = function(req, res) {

  };

  var getEditDestinationById = function(req, res) {

  };

  var editDestinationById = function(req, res) {

  };

  return {
    getDestinationIndex: getDestinationIndex,
    getDestinationById: getDestinationById,
    addDestination: addDestination,
    getEditDestinationById: getEditDestinationById,
    editDestinationById: editDestinationById,
  };
};

module.exports = destinationController;
