var express = require('express');
var bookingRouter = express.Router();

var router = function(routeConfig, middlewareController) {
  var bookingController = require('../controllers/bookingController')(routeConfig, middlewareController);

  bookingRouter.use('/', middlewareController.middleware);

  // <------------------------------GET------------------------------>

  bookingRouter.route('/')
    .get(bookingController.getBookingIndex);

  bookingRouter.route('/add')
    .get(bookingController.getAddBooking);

  bookingRouter.route('/:id')
    .get(bookingController.getBookingById);

  // <------------------------------POST------------------------------>

  bookingRouter.route('/add')
    .post(bookingController.addBooking);

  // <------------------------------PUT------------------------------>

  bookingRouter.route('/:id')
    .put(bookingController.editBookingById);

  // <------------------------------DELETE------------------------------>

  bookingRouter.route('/:id')
    .delete(bookingController.deleteBookingById);

  return bookingRouter;
};

module.exports = router;
