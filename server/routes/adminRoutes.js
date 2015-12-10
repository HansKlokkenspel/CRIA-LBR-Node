var express = require('express');
var adminRouter = express.Router();

var router = function(routeConfig) {
  var adminController = require('../controllers/adminController')();

  adminRouter.use('/', adminController.middleware);

  adminRouter.route('/')
    .get(adminController.adminHome);

  return adminRouter;
};

module.exports = router;
