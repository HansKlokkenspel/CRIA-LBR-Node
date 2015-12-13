var express = require('express');
var destinationRoutes = express.Router();

var router = function(routeConfig, middlewareController) {
  var destinationController = require('../controllers/destinationController')(routeConfig, middlewareController);

  destinationRoutes.use('/', middlewareController.middleware);

  // <------------------------------GET------------------------------>

  destinationRoutes.route('/')
    .get(destinationController.getDestinationIndex);

  destinationRoutes.route('/add')
    .get(destinationController.getAddDestination);

  destinationRoutes.route('/:id')
    .get(destinationController.getDestinationById);

  destinationRoutes.route('/edit/:id')
    .get(destinationController.getEditDestinationById);

  // <------------------------------POST------------------------------>

  destinationRoutes.route('/add')
    .post(destinationController.addDestination);

  destinationRoutes.route('/edit/:id')
    .post(destinationController.editDestinationById);

  return destinationRoutes;
};

module.exports = router;
