var express = require('express');
var userRouter = express.Router();

var router = function(routeConfig) {
  var middlewareController = require('../controllers/middlewareController')();
  var userController = require('../controllers/userController')(routeConfig);

  userRouter.use('/', middlewareController.middleware);

  userRouter.route('/index')
    .get(userController.index);

  userRouter.route('/edit')
    .get(userController.edit);

  userRouter.route('/edit')
    .post(userController.edit);

  return userRouter;
};

module.exports = router;
