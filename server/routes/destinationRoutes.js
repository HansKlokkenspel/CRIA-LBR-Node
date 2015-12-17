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

  // <------------------------------POST------------------------------>

  destinationRoutes.route('/add')
    .post(destinationController.addDestination);

  // <------------------------------PUT------------------------------>

  destinationRoutes.route('/:id')
    .put(destinationController.editDestinationById);

  // <------------------------------DELETE------------------------------>

  destinationRoutes.route('/:id')
    .delete(destinationController.deleteDestinationById);

  return destinationRoutes;
};

module.exports = router;
