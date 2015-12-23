var bookingRepository = require('../repositories/modelRepository')('bookingModel');
var hotelRepository = require('../repositories/modelRepository')('hotelModel');
var arrangementRepository = require('../repositories/modelRepository')('arrangementModel');

var bookingController = function (routeConfig, middlewareController) {
    var paramHandler = require('../config/utils/paramHandler')(routeConfig);

    // <------------------------------GET------------------------------>
    var getBookingIndex = function (req, res) {
        res.render(routeConfig.viewsLocation.bookings.getBookingIndex, paramHandler.getDefaultParams(req));
    };

    var getBookingById = function (req, res) {
        //TODO: Check if booking is attached to current user
        res.render(routeConfig.viewsLocation.bookings.getBookingById, paramHandler.getDefaultParams(req));
    };

    // <------------------------------POST------------------------------>

    var addBooking = function (req, res) {
        bookingRepository.addModel(req.body, function (result) {
            if (result.hasOwnProperty('result')) {
                req.flash('success_messages', 'Destination has been succesfully saved!');
                res.redirect(routeConfig.routes.bookings + '/' + result.result._id);
            } else {
                req.flash('error_messages', result.error.message);
                res.redirect(pages.getBookingIndex);
            }
        });
    };

    // <------------------------------PUT------------------------------>

    var editBookingById = function (req, res) {
        //TODO: Check if booking is attached to current user
    };

    // <------------------------------DELETE------------------------------>

    var deleteBookingById = function (req, res) {
        //TODO: Check if booking is attached to current user
    };

    return {
        getBookingIndex: getBookingIndex,
        getBookingById: getBookingById,
        addBooking: addBooking,
        editBookingById: editBookingById,
        deleteBookingById: deleteBookingById,
    };
};

module.exports = bookingController;
