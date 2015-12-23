var express = require('express');
var bookingRouter = express.Router();

var router = function(routeConfig, middlewareController) {
  var bookingController = require('../controllers/bookingController')(routeConfig, middlewareController);

  bookingRouter.use('/', middlewareController.middleware);

  // <------------------------------GET------------------------------>

  bookingRouter.route('/')
    .get(bookingController.getBookingIndex);

  bookingRouter.route('/:id')
    .get(bookingController.getBookingById);

  // <------------------------------POST------------------------------>

  bookingRouter.route('/add/:hotelId/:arrangementId')
    .post(bookingController.addBooking);

  // <------------------------------PUT------------------------------>

  bookingRouter.route('/:id')
    .post(bookingController.editBookingById);

  // <------------------------------DELETE------------------------------>

  bookingRouter.route('/delete/:id')
    .get(bookingController.deleteBookingById);

  return bookingRouter;
};

module.exports = router;
