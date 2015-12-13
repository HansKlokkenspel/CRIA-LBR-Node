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

  bookingRouter.route('/edit/:id')
    .get(bookingController.getEditBookingById);

  // <------------------------------POST------------------------------>

  bookingRouter.route('/add')
    .post(bookingController.addBooking);

  bookingRouter.route('/edit/:id')
    .post(bookingController.editBookingById);

  return bookingRouter;
};

module.exports = router;
