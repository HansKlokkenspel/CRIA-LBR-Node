var apiController = function(){
    var getUserById = function(){};
    var getBookings = function(){};
    var getBookingById = function(){};
    var getDestinations = function(){};
    var getDestinationById = function(){};
    var addUser = function(){};
    var addBooking = function(){};
    var addDestination = function(){};
    var editUserById = function(){};
    var editBookingById = function(){};
    var editDestinationById = function(){};
    var deleteBookingById = function(){};
    var deleteDestinationById = function(){};

    return {
        getUserById: getUserById ,
        getBookings: getBookings ,
        getBookingById: getBookingById ,
        getDestinations: getDestinations ,
        getDestinationById: getDestinationById ,
        addUser: addUser ,
        addBooking: addBooking ,
        addDestination: addDestination ,
        editUserById: editUserById ,
        editBookingById: editBookingById ,
        editDestinationById: editDestinationById ,
        deleteBookingById: deleteBookingById ,
        deleteDestinationById: deleteDestinationById
    };
};

module.exports = apiController;