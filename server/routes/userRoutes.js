var express = require('express');
var userRouter = express.Router();

var router = function(routeConfig) {
  var middlewareController = require('../controllers/middlewareController')();
  var userController = require('../controllers/userController')(routeConfig);

  userRouter.use('/', middlewareController.middleware);

  userRouter.route('/index')
    .get(userController.profile);

  return userRouter;
};

module.exports = router;
