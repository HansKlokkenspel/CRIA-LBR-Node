var path = require('path');
var appDir = path.dirname(require.main.filename);

var navStructure = require(path.resolve(appDir, 'server/config/utils/navStructure'));

var routeConfig = function() {
  var routes = {
    auth: '/auth',
    admin: '/admin',
    profile: '/profile',
  };

  var nav = {
    structure: navStructure,
  };

  var pages = {
    login: routes.auth + '/login',
    logout: routes.auth + '/logout',
    signup: routes.auth + '/signup',
    profile: routes.profile + '/index',
    admin: routes.admin + '/adminPanel',
  };

  var viewsLocation = {
    login: pages.login.substring(1),
    logout: pages.logout.substring(1),
    signup: pages.signup.substring(1),
    profile: pages.profile.substring(1),
    admin: pages.admin.substring(1),
  };

  return {
    routes: routes,
    nav: nav,
    pages: pages,
    viewsLocation: viewsLocation,
  };
};

module.exports = routeConfig;
