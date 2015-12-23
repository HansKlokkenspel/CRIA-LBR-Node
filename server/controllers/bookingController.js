var bookingRepository = require('../repositories/modelRepository')('bookingModel');

var bookingController = function (routeConfig, middlewareController) {
    var paramHandler = require('../config/utils/paramHandler')(routeConfig);
    var viewsLocation = routeConfig.viewsLocation.bookings;
    var pages = routeConfig.pages.bookings;

    // <------------------------------GET------------------------------>
    var getBookingIndex = function (req, res) {
        addRenderParams(req, paramHandler, function (params) {
            res.render(viewsLocation.getBookingIndex, params);
        });
    };

    var getBookingById = function (req, res) {
        addRenderParams(req, paramHandler, function (params) {
            res.render(viewsLocation.getBookingById, params);
        });
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
        bookingRepository.editModelById(req.params.id, req.body, function (saveResult) {
            if (saveResult.result) {
                res.redirect(routeConfig.routes.bookings + '/' + saveResult.result._id);
            } else {
                req.flash('error_messages', saveResult.error.message);
                res.redirect(req.get('referrer'));
            }
        });
    };

    // <------------------------------DELETE------------------------------>

    var deleteBookingById = function (req, res) {
        bookingRepository.deleteModelById(req.params.id, function (err) {
            if (err) {
                req.flash('error_messages', err.message);
            } else {
                req.flash('succes_messages', 'The destination has been succesfully removed!');
            }
            res.redirect(pages.getDestinationIndex);
        });
    };

    return {
        getBookingIndex: getBookingIndex,
        getBookingById: getBookingById,
        addBooking: addBooking,
        editBookingById: editBookingById,
        deleteBookingById: deleteBookingById,
    };
};

var addRenderParams = function (req, paramHandler, cb) {
    var id = req.params.id;
    var defaultParams = paramHandler.getDefaultParams(req);

    if (!req.query.page) {
        req.query.page = 1;
    }

    if (typeof id !== 'undefined') {
        bookingRepository.findModelById(id, function (popResult) {
            cb(joinParams(popResult, defaultParams));
        });
    } else {
        bookingRepository.paginateModel(req.query, req.query.page, 5, function (paginationResult) {
            cb(joinParams(paginationResult, defaultParams));
        });
    }
};

var joinParams = function (result, defaultParams) {
    var bookings = {};
    var pagination = {};

    if (result.hasOwnProperty('docs')) {
        bookings = result.docs;
        pagination = {
            currentPage: result.page,
            totalPageCount: result.pages
        };
    } else {
        bookings = result.result;
    }

    var params = {
        bookings: bookings,
        pagination: pagination
    };

    return Object.assign(params, defaultParams);
};

module.exports = bookingController;
