var bookingController = function(routeConfig) {

  var getBookingIndex = function(req, res) {
    res.render(viewsLocation.profile.getBookingIndex, {
      nav: routeConfig.nav.structure,
      user: {
        name: req.user.displayName,
        image: req.user.image,
      },
    });
  };

  var getBookingById = function(req, res) {
    res.render(viewsLocation.profile.getBookingById, {
      nav: routeConfig.nav.structure,
      user: {
        name: req.user.displayName,
        image: req.user.image,
      },
    });
  };

  var addBooking = function(req, res) {

  };

  var getEditBookingById = function(req, res) {

  };

  var editBookingById = function(req, res) {

  };

  return {
    getBookingIndex: getBookingIndex,
    getBookingById: getBookingById,
    addBooking: addBooking,
    getEditBookingById: getEditBookingById,
    editBookingById: editBookingById,
  };
};

module.exports = bookingController;
