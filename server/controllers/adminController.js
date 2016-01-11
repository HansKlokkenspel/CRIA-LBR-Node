var bookingRepository = require('../repositories/modelRepository')('bookingModel');
var destinationRepository = require('../repositories/modelRepository')('destinationModel');
var hotelRepository = require('../repositories/modelRepository')('hotelModel');

var adminController = function (routeConfig) {
    var paramHandler = require('../config/utils/paramHandler')(routeConfig);
    var middlewareController = require('./middlewareController')();

    // <------------------------------GET------------------------------>

    var adminPanel = function (req, res) {
        bookingRepository.findModels(req.query, function (bookings) {
            //bookingRepository.findCount('hotels');
            bookingRepository.findCount('hotel', function (count) {
                var ids = [];
                for (var i = 0; i < count.length; i++) {
                    ids.push(count[i]._id);
                }

                hotelRepository.findModelsByQuery({
                    '_id': {$in: ids}
                }, function (popHotel) {
                    var params = {
                        hotel: []
                    };

                    console.log(popHotel[0].name);
                    console.log(popHotel.length);

                    for(var i = 0; i < popHotel.length; i++){
                        var hotel = {
                            name: popHotel[i].name,
                            total: count[i].total
                        };

                        params["hotel"].push(hotel);
                    }

                    console.log(params.hotel);
                    res.render(routeConfig.viewsLocation.admin, paramHandler.getDefaultParams(req));
                });
            });
        });
    };

    return {
        adminPanel: adminPanel,
    };
};

module.exports = adminController;
