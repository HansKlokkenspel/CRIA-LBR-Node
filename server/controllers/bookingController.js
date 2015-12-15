var bookingController = function(routeConfig, middlewareController) {
  var paramHandler = require('../config/utils/paramHandler')(routeConfig);

  // <------------------------------GET------------------------------>
  var getBookingIndex = function(req, res) {
    res.render(routeConfig.viewsLocation.bookings.getBookingIndex, paramHandler.getDefaultParams(req));
  };

  var getBookingById = function(req, res) {
    //TODO: Check if booking is attached to current user
    res.render(routeConfig.viewsLocation.bookings.getBookingById, paramHandler.getDefaultParams(req));
  };


  var getAddBooking = function(req, res) {
    res.render(routeConfig.viewsLocation.bookings.getAddBooking, paramHandler.getDefaultParams(req));
  };

  var getEditBookingById = function(req, res) {
    //TODO: Check if booking is attached to current user
    res.render(routeConfig.viewsLocation.bookings.getEditBookingById, paramHandler.getDefaultParams(req));
  };

  // <------------------------------POST------------------------------>

  var addBooking = function(req, res) {

  };

  var editBookingById = function(req, res) {
    //TODO: Check if booking is attached to current user
  };

  return {
    getBookingIndex: getBookingIndex,
    getBookingById: getBookingById,
    addBooking: addBooking,
    getAddBooking: getAddBooking,
    getEditBookingById: getEditBookingById,
    editBookingById: editBookingById,
  };
};

module.exports = bookingController;
