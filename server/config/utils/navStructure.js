var navStructure = function(routes, pages) {
  var nav = [{
    Link: '/',
    Text: 'Home',
  }, {
    Link: routes.bookings,
    Text: 'Bookings',
  }, {
    Link: routes.destinations,
    Text: 'Destinations',
  }, {
    Link: routes.admin,
    Text: 'Admin',
  }, ];

  var dropdown = [{
    Link: pages.login,
    Text: 'Login',
    NeedsAuth: false,
    HideWhenAuth: true,
  }, {
    Link: pages.logout,
    Text: 'Logout',
    NeedsAuth: true,
    HideWhenAuth: false,
  }, {
    Link: pages.signup,
    Text: 'Signup',
    NeedsAuth: false,
    HideWhenAuth: true,
  },
  {
    Link: pages.profile.getIndex,
    Text: 'Profile',
    NeedsAuth: true,
    HideWhenAuth: false,
  },
  {
    Link: pages.google,
    Text: 'Connect Google',
    NeedsAuth: false,
    HideWhenAuth: false,
  },
  {
    Link: pages.facebook,
    Text: 'Connect Facebook',
    NeedsAuth: false,
    HideWhenAuth: false,
  }, ];

  return {
    navStructure: nav,
    dropdown: dropdown,
  };
};

module.exports = navStructure;
