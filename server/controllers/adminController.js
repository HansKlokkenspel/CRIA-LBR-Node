var adminController = function(routeConfig) {
  var paramHandler = require('../config/utils/paramHandler')(routeConfig);
  var middlewareController = require('./middlewareController')();

  // <------------------------------GET------------------------------>

  var adminPanel = function(req, res) {
    res.render(routeConfig.viewsLocation.admin, paramHandler.getDefaultParams(req));
  };

  return {
    adminPanel: adminPanel,
  };
};

module.exports = adminController;
