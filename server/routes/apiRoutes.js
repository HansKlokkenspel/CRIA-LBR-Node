var express = require('express');
var passport = require('passport');
var apiRouter = express.Router();

var router = function (middlewareController) {
    var apiController = require('../controllers/apiController');

    // <------------------------------GET------------------------------>

    //Get current user -> requires login or admin
    apiRouter.route('/user/:id').get(apiController.getUserById);

    //Get bookings -> all for current user, all for all users if admin
    apiRouter.route('/booking').get(apiController.getBookings);

    //Get booking by id -> all for current user
    apiRouter.route('/booking/:id').get(apiController.getBookingById);

    //Get destinations -> all for current user, all for all users if admin
    apiRouter.route('/destination').get(apiController.getDestinations);

    //Get destination by id
    apiRouter.route('/destination/:id').get(apiController.getDestinationById);

    // <------------------------------POST------------------------------>

    //Add new user
    apiRouter.route('/user').post(apiController.addUser);

    //Add booking -> requires login or admin
    apiRouter.route('/booking').post(apiController.addBooking);

    //Add destination -> requires admin
    apiRouter.route('/destination').post(apiController.addDestination);

    // <------------------------------PUT------------------------------>

    //Update current user -> requires login
    apiRouter.route('/user/:id').put(apiController.editUserById);

    //Edit booking by id -> requires login or admin
    apiRouter.route('/booking/:id').put(apiController.editBookingById);

    //Edit destination by id -> requires admin
    apiRouter.route('/destination/:id').put(apiController.editDestinationById);

    // <------------------------------DELETE------------------------------>

    //Delete booking by id -> requires login or admin
    apiRouter.route('/booking/:id').delete(apiController.deleteBookingById);

    //Delete destination by id -> requires admin
    apiRouter.route('/destination/:id').delete(apiController.deleteDestinationById);

    return apiRouter;
};

module.exports = router;