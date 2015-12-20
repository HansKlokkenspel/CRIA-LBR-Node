var Destination = require('../models/destinationModel');
var ObjectId = require('mongodb').ObjectID;

var destinationRepository = function () {

    var findDestinations = function (cb) {
        Destination.find(function (err, result) {
            populateDestination(result, function (popResult) {
                console.log('returning pop result');
                cb(popResult);
            });
        });
    };

    var findDestinationById = function (id, cb) {
        console.log(id);
        id = new ObjectId(id);

        Destination.findOne({
            _id: id
        }, function (err, result) {
            populateDestination(result, function (popResult) {
                cb(popResult);
            });
        });
    };

    var editDestinationById = function (id, newDestination, cb) {
        id = new ObjectId(id);

        Destination.findOne({
                _id: id
            }, function (err, result) {
                if (result) {
                    result.name = newDestination.name;
                    result.description = newDestination.description;
                    //result.hotels = newDestination.hotels;

                    result.save(function (err, saveResult) {
                        if (saveResult) {
                            cb({result: saveResult});
                        } else {
                            cb({error: err});
                        }
                    });
                } else {
                    cb(err);
                }
            }
        );
    };

    var deleteDestinationById = function (id, cb) {
        id = new ObjectId(id);

        Destination.remove({
            _id: id
        }, function (err) {
            cb(err);
        });
    };

    var addDestination = function (destination) {
        var newDestination = new Destination();

        newDestination.name = destination.name;
        newDestination.description = destination.description;
        // newDestination.hotels = destination.hotels;

        newDestination.save(function (err, result) {
            if (result) {
                return result;
            } else {
                return err;
            }
        });
    };

    return {
        findDestinations: findDestinations,
        findDestinationById: findDestinationById,
        editDestinationById: editDestinationById,
        deleteDestinationById: deleteDestinationById,
        addDestination: addDestination
    };
};

var populateDestination = function (result, cb) {
    Destination.deepPopulate(result, 'hotels.arrangements', function (err, popResult) {
        if (!err) {
            cb(popResult);
        } else {
            cb(err);
        }
    });
};

module.exports = destinationRepository;