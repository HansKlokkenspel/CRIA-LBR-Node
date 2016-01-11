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
                        hotel: [],
                        bookings: [],
                        totalPrice: [],
                        arrangements: {}
                    };

                    for (var i = 0; i < popHotel.length; i++) {
                        var hotel = {
                            name: popHotel[i].name,
                            total: count[i].total
                        };

                        params["hotel"].push(hotel);
                    }

                    params.bookings = bookings.result;

                    var arrangementCount = {
                        halfpension: 0,
                        fullpension: 0,
                        breakfast: 0
                    };

                    for (var j = 0; j < bookings.result.length; j++) {
                        var price;
                        if(params.totalPrice.length < 1){
                             price = {
                                name: bookings.result[j].hotel.name,
                                total: (bookings.result[j].arrangement.price * bookings.result[j].arrangement.people)
                            };
                            params.totalPrice.push(price);
                        }

                        for (var k = 0; k < params.totalPrice.length; k++) {
                            if (params.totalPrice[k].name === (bookings.result[j].hotel.name)) {
                                params.totalPrice[k].total += (bookings.result[j].arrangement.price * bookings.result[j].arrangement.people);
                            } else {
                                price = {
                                    name: bookings.result[j].hotel.name,
                                    total: (bookings.result[j].arrangement.price * bookings.result[j].arrangement.people)
                                };
                                params.totalPrice.push(price);
                            }
                        }

                        switch (bookings.result[j].arrangement.name) {
                            case 'Half pension':
                                arrangementCount.halfpension++;
                                break;
                            case 'Full pension':
                                arrangementCount.fullpension++;
                                break;
                            case 'Breakfast':
                                arrangementCount.breakfast++;
                                break;
                        }
                    }

                    params.arrangements = arrangementCount;

                    var defaultParams = paramHandler.getDefaultParams(req);

                    Object.assign(params, defaultParams);
                    console.log(params);
                    res.render(routeConfig.viewsLocation.admin, params);
                });
            });
        });
    };

    return {
        adminPanel: adminPanel,
    };
};

module.exports = adminController;
