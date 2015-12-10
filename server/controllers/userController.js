var userController = function(routeConfig){
  var profile = function(req, res) {
    res.render('profile/profile', {
      nav: routeConfig.nav.structure,
      user: {
        name: req.user.displayName,
        image: req.user.image,
      },
    });
  }

  return {
    profile: profile,
  }
}

module.exports = userController;
