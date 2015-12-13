var express = require('express');
var adminRouter = express.Router();

var router = function(routeConfig, middlewareController) {
  var adminController = require('../controllers/adminController')(routeConfig);

  adminRouter.use('/', middlewareController.adminMiddleware);

  // <------------------------------GET------------------------------>

  adminRouter.route('/')
    .get(adminController.adminPanel);

  // <------------------------------POST------------------------------>

  return adminRouter;
};

module.exports = router;
