var path = require('path');
var appDir = path.dirname(require.main.filename);

var navStructure = require(path.resolve(appDir, 'server/config/utils/navStructure'));

var routeConfig = function() {
  return {
    routes: {
      auth: '/auth',
      admin: '/admin',
      user: '/user',
    },
    nav: {
      structure: navStructure
    }
  };
}

module.exports = routeConfig;
