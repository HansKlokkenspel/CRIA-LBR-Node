var userRepository = require('../repositories/modelRepository')('userModel');
var destinationRepository = require('../repositories/modelRepository')('destinationModel');
var bookingRepository = require('../repositories/modelRepository')('bookingModel');

var apiController = function () {
    var getUserById = function (req, res) {
        userRepository.findModels(function(result){
            if(result.hasOwnProperty('error')){
                res.send(result.error);
            }

            res.json(result);
        });
    };

    var getBookings = function (req, res) {
        bookingRepository.findModels(function(result){
            if(result.hasOwnProperty('error')){
                res.send(result.error);
            }

            res.json(result);
        });
    };

    var getBookingById = function (req, res) {

    };

    var getDestinations = function (req, res) {
        destinationRepository.findModels({}, function(result){
            if(result.hasOwnProperty('error')){
                res.send(result.error);
            }

            res.json(result);
        });
    };

    var getDestinationById = function (req, res) {
        destinationRepository.findModelById(req.params.id, function(result){
            if(result.hasOwnProperty('error')){
                res.send(result.error);
            }

            res.json(result);
        });
    };

    var addUser = function (req, res) {

    };

    var addBooking = function (req, res) {

    };

    var addDestination = function (req, res) {

    };

    var editUserById = function (req, res) {

    };

    var editBookingById = function (req, res) {

    };

    var editDestinationById = function (req, res) {

    };

    var deleteBookingById = function (req, res) {

    };

    var deleteDestinationById = function (req, res) {

    };


    return {
        getUserById: getUserById,
        getBookings: getBookings,
        getBookingById: getBookingById,
        getDestinations: getDestinations,
        getDestinationById: getDestinationById,
        addUser: addUser,
        addBooking: addBooking,
        addDestination: addDestination,
        editUserById: editUserById,
        editBookingById: editBookingById,
        editDestinationById: editDestinationById,
        deleteBookingById: deleteBookingById,
        deleteDestinationById: deleteDestinationById
    };
};

module.exports = apiController;