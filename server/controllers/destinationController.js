var Destination = require('../models/destinationModel');
var ObjectId = require('mongodb').ObjectID;

var destinationController = function (routeConfig, middlewareController) {
    var paramHandler = require('../config/utils/paramHandler')(routeConfig);

    // <------------------------------GET------------------------------>
    var getDestinationIndex = function (req, res) {
        addRenderParams(req, paramHandler, function (params) {
            res.render(routeConfig.viewsLocation.destinations.getDestinationIndex, params);
        });
    };

    var getDestinationById = function (req, res) {
        var id = new ObjectId(req.params.id);
        addRenderParams(req, paramHandler, function (params) {
            res.render(routeConfig.viewsLocation.destinations.getDestinationById, params);
        }, id);
    };

    var getAddDestination = function (req, res) {
        middlewareController.checkUserPrivileges(req, function (valid) {
            if (valid) {
                res.render(routeConfig.viewsLocation.destinations.getAddDestination,
                    paramHandler.getDefaultParams(req));
            } else {
                res.redirect('/');
            }
        });
    };

    // <------------------------------POST------------------------------>

    var addDestination = function (req, res) {
        middlewareController.checkUserPrivileges(req, function (valid) {
            if (valid) {
                var destination = new Destination();

                destination.name = req.body.name;
                destination.description = req.body.description;
                // destination.hotels = req.body.hotels;

                destination.save(function (err, result) {
                    if (result) {
                        res.redirect(routeConfig.routes.destinations + '/' + result._id);
                    } else {
                        req.flash('error_messages', err.message);
                        res.redirect('/');
                    }
                });
            } else {
                res.redirect('/');
            }
        });
    };

    // <------------------------------PUT------------------------------>

    var editDestinationById = function (req, res) {
        middlewareController.checkUserPrivileges(req, function (valid) {
            // if (valid) {} else {}
        });
    };

    // <------------------------------DELETE------------------------------>

    var deleteDestinationById = function (req, res) {
        middlewareController.checkUserPrivileges(req, function (valid) {
            // if (valid) {} else {}
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

var addRenderParams = function (req, paramHandler, cb, id) {
    var defaultParams = paramHandler.getDefaultParams(req);

    if (typeof id !== 'undefined') {
        Destination.findOne({
            _id: id,
        }, function (err, result) {
            populateDestination(result, function (params) {
                Object.assign(params, defaultParams);
                cb(params);
            });
        });
    } else {
        Destination.find(function (err, result) {
            populateDestination(result, function (params) {
                Object.assign(params, defaultParams);
                cb(params);
            });
        });
    }
};

var populateDestination = function (result, cb) {
    Destination.deepPopulate(result, 'hotels.arrangements', function (err, dest) {
        var params = {
            destinations: dest,
        };
        cb(params);
    });
};

module.exports = destinationController;
