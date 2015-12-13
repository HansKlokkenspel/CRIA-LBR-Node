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
      index: routes.profile + '/index',
      edit: routes.profile + '/edit',
    },
    bookings: {
      getBookingIndex: routes.bookings,
      getBookingById: routes.bookings + '/:id',
    },
    destinations: {
      getDestinationIndex: routes.destinations,
      getDestinationById: routes.destinations + '/:id',
    },
    admin: routes.admin + '/adminPanel',
  };

  var viewsLocation = {
    login: pages.login.substring(1),
    logout: pages.logout.substring(1),
    signup: pages.signup.substring(1),
    profile: {
      index: pages.profile.index.substring(1),
      edit: pages.profile.edit.substring(1),
    },
    bookings: {
      getBookingIndex: pages.bookings.getBookingIndex.substring(1) + '/bookingListView',
      getBookingById: pages.bookings.getBookingIndex.substring(1) + '/bookingView'
    },
    destinations: {
      getDestinationIndex: pages.destinations.getDestinationIndex.substring(1) + '/destinationListView',
      getDestinationById: pages.destinations.getDestinationIndex.substring(1) + '/destinationView'
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
