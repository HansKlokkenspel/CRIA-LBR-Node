var userController = function(routeConfig) {
  var viewsLocation = routeConfig.viewsLocation;

  var profile = function(req, res) {
    res.render(viewsLocation.profile, {
      nav: routeConfig.nav.structure,
      user: {
        name: req.user.displayName,
        image: req.user.image,
      },
    });
  };

  return {
    profile: profile,
  };
};

module.exports = userController;
