var bookingController = function(routeConfig, middlewareController) {
  // <------------------------------GET------------------------------>
  var getBookingIndex = function(req, res) {
    res.render(routeConfig.viewsLocation.bookings.getBookingIndex, {
      nav: routeConfig.nav.structure,
      user: {
        name: req.user.displayName,
        image: req.user.image,
      },
    });
  };

  var getBookingById = function(req, res) {
    //TODO: Check if booking is attached to current user
    res.render(routeConfig.viewsLocation.bookings.getBookingById, {
      nav: routeConfig.nav.structure,
      user: {
        name: req.user.displayName,
        image: req.user.image,
      },
    });
  };


  var getAddBooking = function(req, res) {
    // TODO: Uniform render params setup
    res.render(routeConfig.viewsLocation.bookings.getAddBooking, {
      nav: routeConfig.nav.structure,
      user: {
        name: req.user.displayName,
        image: req.user.image,
      },
    });
  };

  var getEditBookingById = function(req, res) {
    //TODO: Check if booking is attached to current user
    res.render(routeConfig.viewsLocation.bookings.getEditBookingById, {
      nav: routeConfig.nav.structure,
      user: {
        name: req.user.displayName,
        image: req.user.image,
      },
    });
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
