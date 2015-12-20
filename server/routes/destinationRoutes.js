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
    .post(destinationController.editDestinationById);

  // <------------------------------DELETE------------------------------>

  destinationRoutes.route('/delete/:id')
    .get(destinationController.deleteDestinationById);

  return destinationRoutes;
};

module.exports = router;
