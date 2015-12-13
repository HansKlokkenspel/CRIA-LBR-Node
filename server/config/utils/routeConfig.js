var path = require('path');
var appDir = path.dirname(require.main.filename);

var navStructure = require(path.resolve(appDir, 'server/config/utils/navStructure'));

var routeConfig = function() {
  var routes = {
    auth: '/auth',
    admin: '/admin',
    profile: '/profile',
    bookings: '/bookings',
    destinations: '/destinations',
  };

  var nav = {
    structure: navStructure,
  };

  var pages = {
    login: routes.auth + '/login',
    logout: routes.auth + '/logout',
    signup: routes.auth + '/signup',
    profile: {
      getIndex: routes.profile + '/index',
      getEdit: routes.profile + '/edit',
    },
    bookings: {
      getBookingIndex: routes.bookings,
      getBookingById: routes.bookings + '/:id',
      getAddBooking: routes.bookings + '/add',
    },
    destinations: {
      getDestinationIndex: routes.destinations,
      getDestinationById: routes.destinations + '/:id',
      getAddDestination: routes.destinations + '/add',
    },
    admin: routes.admin + '/adminPanel',
  };

  var viewsLocation = {
    login: pages.login.substring(1),
    logout: pages.logout.substring(1),
    signup: pages.signup.substring(1),
    profile: {
      getIndex: pages.profile.getIndex.substring(1),
      getEdit: pages.profile.getEdit.substring(1),
    },
    bookings: {
      getBookingIndex: pages.bookings.getBookingIndex.substring(1) + '/bookingListView',
      getBookingById: pages.bookings.getBookingIndex.substring(1) + '/bookingView',
      getAddBooking: pages.bookings.getBookingIndex.substring(1) + '/addBookingView',
    },
    destinations: {
      getDestinationIndex: pages.destinations.getDestinationIndex.substring(1) + '/destinationListView',
      getDestinationById: pages.destinations.getDestinationIndex.substring(1) + '/destinationView',
      getAddDestination: pages.destinations.getDestinationIndex.substring(1) + '/destinationAddView',
    },
    admin: pages.admin.substring(1),
  };

  return {
    routes: routes,
    nav: nav,
    pages: pages,
    viewsLocation: viewsLocation,
  };
};

module.exports = routeConfig;
