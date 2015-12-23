var destinationRepository = require('../repositories/modelRepository')('destinationModel');
var paginate = require('express-paginate');

var destinationController = function (routeConfig, middlewareController) {
    var paramHandler = require('../config/utils/paramHandler')(routeConfig);
    var viewsLocation = routeConfig.viewsLocation.destinations;
    var pages = routeConfig.pages.destinations;
    // <------------------------------GET------------------------------>
    var getDestinationIndex = function (req, res) {
        addRenderParams(req, paramHandler, function (params) {
            res.render(viewsLocation.getDestinationIndex, params);
        });
    };

    var getDestinationById = function (req, res) {
        addRenderParams(req, paramHandler, function (params) {
            res.render(viewsLocation.getDestinationById, params);
        });
    };

    // <------------------------------POST------------------------------>

    var addDestination = function (req, res) {
        middlewareController.checkUserPrivileges(req, function (valid) {
            if (valid) {
                destinationRepository.addModel(req.body, function (result) {
                    if (result.hasOwnProperty('result')) {
                        req.flash('success_messages', 'Destination has been succesfully saved!');
                        res.redirect(routeConfig.routes.destinations + '/' + result.result._id);
                    } else {
                        req.flash('error_messages', result.error.message);
                        res.redirect(pages.getDestinationIndex);
                    }
                });
            } else {
                req.flash('error_messages', 'You dont have the right privileges');
                res.redirect(pages.getDestinationIndex);
            }
        });
    };

    // <------------------------------PUT------------------------------>

    var editDestinationById = function (req, res) {
        destinationRepository.editModelById(req.params.id, req.body, function (saveResult) {
            if (saveResult.result) {
                res.redirect(routeConfig.routes.destinations + '/' + saveResult.result._id);
            } else {
                req.flash('error_messages', saveResult.error.message);
                res.redirect(req.get('referer'));
            }
        });
    };

// <------------------------------DELETE------------------------------>

    var deleteDestinationById = function (req, res) {
        middlewareController.checkUserPrivileges(req, function (valid) {
            if (valid) {
                destinationRepository.deleteModelById(req.params.id, function (err) {
                    if (err) {
                        req.flash('error_messages', err.message);
                    } else {
                        req.flash('succes_messages', 'The destination has been succesfully removed!');
                    }
                    res.redirect(pages.getDestinationIndex);
                });
            } else {
                req.flash('error_messages', 'You are not authorized to do this!');
                res.redirect(pages.getDestinationIndex);
            }
        });
    };

    return {
        getDestinationIndex: getDestinationIndex,
        getDestinationById: getDestinationById,
        addDestination: addDestination,
        deleteDestinationById: deleteDestinationById,
        editDestinationById: editDestinationById,
    };
};

var addRenderParams = function (req, paramHandler, cb) {
    var id = req.params.id;
    var defaultParams = paramHandler.getDefaultParams(req);

    if (!req.query.page) {
        req.query.page = 1;
    }

    if (typeof id !== 'undefined') {
        destinationRepository.findModelById(id, function (popResult) {
            cb(joinParams(popResult, defaultParams));
        });
    } else {
        destinationRepository.paginateModel(req.query, req.query.page, 5, function (paginationResult) {
            cb(joinParams(paginationResult, defaultParams));
        });
    }
};

var joinParams = function (result, defaultParams) {
    var destinations = {};
    var pagination = {};

    if (result.hasOwnProperty('docs')) {
        destinations = result.docs;
        pagination = {
            currentPage: result.page,
            totalPageCount: result.pages
        };
    } else {
        destinations = result.result;
    }

    params = {
        destinations: destinations,
        pagination: pagination
    };

    return Object.assign(params, defaultParams);
};

module.exports = destinationController;
