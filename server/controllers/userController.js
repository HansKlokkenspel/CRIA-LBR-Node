var userController = function(routeConfig) {
  var paramHandler = require('../config/utils/paramHandler')(routeConfig);
  var viewsLocation = routeConfig.viewsLocation;

  // <------------------------------GET------------------------------>

  var getIndex = function(req, res) {
    res.render(viewsLocation.profile.getIndex, paramHandler.getDefaultParams(req));
  };

  var getEdit = function(req, res) {
    res.render(viewsLocation.profile.getEdit, paramHandler.getDefaultParams(req));
  };

  // <------------------------------POST------------------------------>

  var edit = function(req, res) {};

  return {
    getIndex: getIndex,
    getEdit: getEdit,
    edit: edit,
  };
};

module.exports = userController;
