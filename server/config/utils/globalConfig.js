var globalConfig = function() {
  return {
    routes: {
      auth: '/auth',
      admin: '/admin',
      user: '/user',
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
    }
  };
};

module.exports = globalConfig;
