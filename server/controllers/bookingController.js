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

  // <------------------------------POST------------------------------>

  var addBooking = function(req, res) {

  };

  // <------------------------------PUT------------------------------>

  var editBookingById = function(req, res) {
    //TODO: Check if booking is attached to current user
  };

  // <------------------------------DELETE------------------------------>

  var deleteBookingById = function(req, res) {
    //TODO: Check if booking is attached to current user
  };

  return {
    getBookingIndex: getBookingIndex,
    getBookingById: getBookingById,
    addBooking: addBooking,
    getAddBooking: getAddBooking,
    editBookingById: editBookingById,
    deleteBookingById: deleteBookingById,
  };
};

module.exports = bookingController;
