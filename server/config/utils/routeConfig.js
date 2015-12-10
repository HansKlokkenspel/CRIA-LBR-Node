var path = require('path');
var appDir = path.dirname(require.main.filename);

var navStructure = require(path.resolve(appDir, 'server/config/utils/navStructure'));

var routeConfig = function() {
  var routes = {
    auth: '/auth',
    admin: '/admin',
    user: '/user',
  };

  var nav = {
    structure: navStructure,
  };

  var pages = {
    login: routes.auth + '/login',
    logout: routes.auth + '/logout',
    signup: routes.auth + '/signup',
    profile: routes.user + '/profile',
    admin: routes.admin,
  };

  return {
    routes: routes,
    nav: nav,
    pages: pages,
  };
};

module.exports = routeConfig;
