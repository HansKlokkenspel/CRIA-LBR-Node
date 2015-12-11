var express = require('express');
var bookingRouter = express.Router();

var router = function(routeConfig) {
  var middlewareController = require('../controllers/middlewareController')();
  var bookingController = require('../controllers/bookingController')(routeConfig);

  bookingRouter.use('/', middlewareController.middleware);

  bookingRouter.route('/')
    .get(bookingController.getBookingIndex);

  bookingRouter.route('/')
    .post(bookingController.addBooking);

  bookingRouter.route('/:id')
    .get(bookingController.getBookingById);

  bookingRouter.route('/edit/:id')
    .get(bookingController.getEditBookingById);

  bookingRouter.route('/edit/:id')
    .post(bookingController.editBookingById);

  return {};
};

module.exports = router;
