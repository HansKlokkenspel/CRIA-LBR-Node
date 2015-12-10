var express = require('express');
var adminRouter = express.Router();

var router = function(routeConfig) {
  var adminController = require('../controllers/adminController')(routeConfig);

  adminRouter.use('/', adminController.middleware);

  adminRouter.route('/')
    .get(adminController.adminPanel);

  return adminRouter;
};

module.exports = router;
