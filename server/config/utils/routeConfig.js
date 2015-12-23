var path = require('path');
var appDir = path.dirname(require.main.filename);

var routeConfig = function () {
    var routes = {
        api: '/api',
        auth: '/auth',
        admin: '/admin',
        profile: '/profile',
        bookings: '/bookings',
        destinations: '/destinations',
        hotels: '/hotels'
    };

    var pages = {
        login: routes.auth + '/login',
        logout: routes.auth + '/logout',
        signup: routes.auth + '/signup',
        google: routes.auth + '/google',
        facebook: routes.auth + '/facebook',
        profile: {
            getIndex: routes.profile + '/index',
            getEdit: routes.profile + '/edit',
        },
        bookings: {
            getBookingIndex: routes.bookings,
            getBookingById: routes.bookings + '/:id',
        },
        destinations: {
            getDestinationIndex: routes.destinations,
            getDestinationById: routes.destinations + '/:id',
        },
        hotels: {
            getHotelIndex: routes.hotels,
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
        },
        destinations: {
            getDestinationIndex: pages.destinations.getDestinationIndex.substring(1) + '/destinationListView',
            getDestinationById: pages.destinations.getDestinationIndex.substring(1) + '/destinationView',
        },
        hotels:{
            getHotelIndex: pages.hotels.getHotelIndex.substring(1) + '/hotelListView',
            getHotelById: pages.hotels.getHotelIndex.substring(1) + '/hotelView',
        },
        admin: pages.admin.substring(1),
    };

    var nav = require(path.resolve(appDir, 'server/config/utils/navStructure'))(routes, pages);

    return {
        routes: routes,
        nav: nav,
        pages: pages,
        viewsLocation: viewsLocation,
    };
};

module.exports = routeConfig;
