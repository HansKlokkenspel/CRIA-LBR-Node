var path = require('path');
var appDir = path.dirname(require.main.filename);

var globalConfig = function() {
  return {
    app: {
      appDir: appDir,
    },
    fileLocations: {
      routers: './server/routes/',
      config: './server/config/',
      assets: 'public/assets',
      views: 'server/views',
    },
    mongoDB: {
      database: 'laidbackReizen',
      url: 'mongodb://localhost/',
    },
  };
};

module.exports = globalConfig;
