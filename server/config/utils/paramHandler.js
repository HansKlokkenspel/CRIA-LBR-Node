var paramHandler = function(routeConfig) {
  var getDefaultParams = function(req) {
    return {
      nav: routeConfig.nav.structure,
      user: req.user,
      pages: routeConfig.pages,
    };
  };

  return {
    getDefaultParams: getDefaultParams,
  };
};

module.exports = paramHandler;
