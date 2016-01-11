var bookingRepository = require('../repositories/modelRepository')('bookingModel');
var destinationRepository = require('../repositories/modelRepository')('destinationModel');

var adminController = function(routeConfig) {
  var paramHandler = require('../config/utils/paramHandler')(routeConfig);
  var middlewareController = require('./middlewareController')();

  // <------------------------------GET------------------------------>

  var adminPanel = function(req, res) {
    bookingRepository.findModels(req.query, function(bookings){
        bookingRepository.findCount('hotels');
        res.render(routeConfig.viewsLocation.admin, paramHandler.getDefaultParams(req));
    });
  };

  return {
    adminPanel: adminPanel,
  };
};

module.exports = adminController;
