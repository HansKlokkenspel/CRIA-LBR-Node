var destinationRepository = require('../repositories/destinationRepository')();

var destinationController = function (routeConfig, middlewareController) {
    var paramHandler = require('../config/utils/paramHandler')(routeConfig);

    // <------------------------------GET------------------------------>
    var getDestinationIndex = function (req, res) {
        addRenderParams(req, paramHandler, function (params) {
            res.render(routeConfig.viewsLocation.destinations.getDestinationIndex, params);
        });
    };

    var getDestinationById = function (req, res) {
        addRenderParams(req, paramHandler, function (params) {
            res.render(routeConfig.viewsLocation.destinations.getDestinationById, params);
        });
    };

    var getAddDestination = function (req, res) {
        middlewareController.checkUserPrivileges(req, function (valid) {
            if (valid) {
                res.render(routeConfig.viewsLocation.destinations.getAddDestination,
                    paramHandler.getDefaultParams(req));
            } else {
                req.flash('error_messages', 'You are not an admin!');
                res.redirect(routeConfig.pages.destinations.getDestinationIndex);
            }
        });
    };

    // <------------------------------POST------------------------------>

    var addDestination = function (req, res) {
        middlewareController.checkUserPrivileges(req, function (valid) {
            if (valid) {
                var newDestination = destinationRepository.addDestination(req.body);

                if (newDestination) {
                    req.flash('succes_messages', 'Destination has been succesfully saved!');
                    res.redirect(routeConfig.routes.destinations + '/' + result._id);
                } else {
                    req.flash('error_messages', err.message);
                    res.redirect(routeConfig.pages.destinations.getDestinationIndex);
                }

            } else {
                req.flash('error_messages', 'You dont have the right privileges');
                res.redirect(routeConfig.pages.destinations.getDestinationIndex);
            }
        });
    };

    // <------------------------------PUT------------------------------>

    var editDestinationById = function (req, res) {
        destinationRepository.editDestinationById(req.params.id, req.body, function (saveResult) {
            if (saveResult.result) {
                res.redirect(routeConfig.routes.destinations + '/' + saveResult.result._id);
            } else {
                req.flash('error_messages', saveResult.error.message);
                res.redirect(routeConfig.pages.destinations.getDestinationIndex);
            }
        });
    };

// <------------------------------DELETE------------------------------>

    var deleteDestinationById = function (req, res) {
        middlewareController.checkUserPrivileges(req, function (valid) {
            if (valid) {
                destinationRepository.deleteDestinationById(req.params.id, function (err) {
                    if (err) {
                        req.flash('error_messages', err);
                    } else {
                        req.flash('succes_messages', 'The destination has been succesfully removed!');
                    }
                    res.redirect(routeConfig.pages.destinations.getDestinationIndex);
                });
            } else {
                req.flash('error_messages', 'You are not authorized to do this!');
                res.redirect(routeConfig.pages.destinations.getDestinationIndex);
            }
        });
    };

    return {
        getDestinationIndex: getDestinationIndex,
        getDestinationById: getDestinationById,
        addDestination: addDestination,
        getAddDestination: getAddDestination,
        deleteDestinationById: deleteDestinationById,
        editDestinationById: editDestinationById,
    };
};

var addRenderParams = function (req, paramHandler, cb) {
    var id = req.params.id;
    var defaultParams = paramHandler.getDefaultParams(req);

    if (typeof id !== 'undefined') {
        destinationRepository.findDestinationById(id, function (popResult) {
            cb(joinParams(popResult, defaultParams));
        });
    } else {
        destinationRepository.findDestinations(function (popResult) {
            cb(joinParams(popResult, defaultParams));
        });
    }
};

var joinParams = function (result, defaultParams) {
    params = {
        destinations: result
    };

    return Object.assign(params, defaultParams);
};

module.exports = destinationController;
