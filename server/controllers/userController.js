var userController = function(routeConfig) {
  var viewsLocation = routeConfig.viewsLocation;

  // <------------------------------GET------------------------------>

  var getIndex = function(req, res) {
    res.render(viewsLocation.profile.getIndex, {
      nav: routeConfig.nav.structure,
      user: {
        name: req.user.displayName,
        image: req.user.image,
      },
    });
  };

  var getEdit = function(req, res) {
    res.render(viewsLocation.profile.getEdit, {
      nav: routeConfig.nav.structure,
      user: {
        name: req.user.displayName,
        image: req.user.image,
      },
    });
  };

  // <------------------------------POST------------------------------>

  var edit = function(req, res) {};

  return {
    getIndex: getIndex,
    getEdit: getEdit,
    edit: edit,
  };
};

module.exports = userController;
