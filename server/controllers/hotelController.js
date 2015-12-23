var hotelRepository = require('../repositories/modelRepository')('hotelModel');
var paginate = require('express-paginate');

var hotelController = function (routeConfig, middlewareController) {
    var paramHandler = require('../config/utils/paramHandler')(routeConfig);
    var viewsLocation = routeConfig.viewsLocation.hotels;
    var pages = routeConfig.pages.hotels;
    // <------------------------------GET------------------------------>
    var getHotelIndex = function (req, res) {
        addRenderParams(req, paramHandler, function (params) {
            res.render(viewsLocation.getHotelIndex, params);
        });
    };

    var getHotelById = function (req, res) {
        addRenderParams(req, paramHandler, function (params) {
            res.render(viewsLocation.getHotelById, params);
        });
    };

    // <------------------------------POST------------------------------>

    var addHotel = function (req, res) {
        middlewareController.checkUserPrivileges(req, function (valid) {
            if (valid) {
                hotelRepository.addModel(req.body, function (result) {
                    if (result.hasOwnProperty('result')) {
                        req.flash('succes_messages', 'Hotel has been succesfully saved!');
                        res.redirect(routeConfig.routes.hotels + '/' + result.result._id);
                    } else {
                        req.flash('error_messages', result.error.message);
                        res.redirect(pages.getHotelIndex);
                    }
                });
            } else {
                req.flash('error_messages', 'You dont have the right privileges');
                res.redirect(pages.getHotelIndex);
            }
        });
    };

    // <------------------------------PUT------------------------------>

    var editHotelById = function (req, res) {
        hotelRepository.editModelById(req.params.id, req.body, function (saveResult) {
            if (saveResult.result) {
                res.redirect(routeConfig.routes.hotels + '/' + saveResult.result._id);
            } else {
                req.flash('error_messages', saveResult.error.message);
                res.redirect(req.get('referer'));
            }
        });
    };

// <------------------------------DELETE------------------------------>

    var deleteHotelById = function (req, res) {
        middlewareController.checkUserPrivileges(req, function (valid) {
            if (valid) {
                hotelRepository.deleteModelById(req.params.id, function (err) {
                    if (err) {
                        req.flash('error_messages', err.message);
                    } else {
                        req.flash('succes_messages', 'The hotel has been succesfully removed!');
                    }
                    res.redirect(pages.getHotelIndex);
                });
            } else {
                req.flash('error_messages', 'You are not authorized to do this!');
                res.redirect(pages.getHotelIndex);
            }
        });
    };

    return {
        getHotelIndex: getHotelIndex,
        getHotelById: getHotelById,
        addHotel: addHotel,
        deleteHotelById: deleteHotelById,
        editHotelById: editHotelById,
    };
};

var addRenderParams = function (req, paramHandler, cb) {
    var id = req.params.id;
    var defaultParams = paramHandler.getDefaultParams(req);

    if (!req.query.page) {
        req.query.page = 1;
    }

    if (typeof id !== 'undefined') {
        hotelRepository.findModelById(id, function (popResult) {
            cb(joinParams(popResult, defaultParams));
        });
    } else {
        hotelRepository.paginateModel(req.query, req.query.page, 5, function (paginationResult) {
            cb(joinParams(paginationResult, defaultParams));
        });
    }
};

var joinParams = function (result, defaultParams) {
    var hotels = {};
    var pagination = {};

    if (result.hasOwnProperty('docs')) {
        hotels = result.docs;
        pagination = {
            currentPage: result.page,
            totalPageCount: result.pages
        };
    } else {
        hotels = result.result;
    }

    params = {
        hotels: hotels,
        pagination: pagination
    };

    return Object.assign(params, defaultParams);
};

module.exports = hotelController;
