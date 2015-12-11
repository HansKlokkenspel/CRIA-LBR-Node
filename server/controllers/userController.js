var userController = function(routeConfig) {
  var viewsLocation = routeConfig.viewsLocation;

  var index = function(req, res) {
    res.render(viewsLocation.profile.index, {
      nav: routeConfig.nav.structure,
      user: {
        name: req.user.displayName,
        image: req.user.image,
      },
    });
  };

  var edit = function(req, res) {
    res.render(viewsLocation.profile.edit, {
      nav: routeConfig.nav.structure,
      user: {
        name: req.user.displayName,
        image: req.user.image,
      },
    });
  };

  return {
    index: index,
    edit: edit,
  };
};

module.exports = userController;
