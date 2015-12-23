var express = require('express');
var hotelRoutes = express.Router();

var router = function(routeConfig, middlewareController) {
  var hotelController = require('../controllers/hotelController')(routeConfig, middlewareController);

  hotelRoutes.use('/', middlewareController.middleware);

  // <------------------------------GET------------------------------>

  hotelRoutes.route('/')
    .get(hotelController.getHotelIndex);

  hotelRoutes.route('/:id')
    .get(hotelController.getHotelById);

  // <------------------------------POST------------------------------>

  hotelRoutes.route('/add')
    .post(hotelController.addHotel);

  // <------------------------------PUT------------------------------>

  hotelRoutes.route('/:id')
    .post(hotelController.editHotelById);

  // <------------------------------DELETE------------------------------>

  hotelRoutes.route('/delete/:id')
    .get(hotelController.deleteHotelById);

  return hotelRoutes;
};

module.exports = router;
