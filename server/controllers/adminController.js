var adminController = function(routeConfig) {
  var middlewareController = require('./middlewareController')();

  // <------------------------------GET------------------------------>

  var adminPanel = function(req, res) {
    res.render(routeConfig.viewsLocation.admin);
  };

  return {
    adminPanel: adminPanel,
  };
};

module.exports = adminController;
