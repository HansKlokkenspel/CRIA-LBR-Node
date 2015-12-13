var express = require('express');
var userRouter = express.Router();

var router = function(routeConfig, middlewareController) {
  var userController = require('../controllers/userController')(routeConfig);

  userRouter.use('/', middlewareController.middleware);

  // <------------------------------GET------------------------------>

  userRouter.route('/index')
    .get(userController.getIndex);

  userRouter.route('/edit')
    .get(userController.getEdit);

  // <------------------------------POST------------------------------>

  userRouter.route('/edit')
    .post(userController.edit);

  return userRouter;
};

module.exports = router;
