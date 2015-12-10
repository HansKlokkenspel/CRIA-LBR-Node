var middlewareController = function() {
  var middleware = function(req, res, next) {
    if (req.user) {
      console.log('The user is logged in, congratulations!');
      return next();
    }

    console.log('The user is not logged in!');
    res.redirect('/');
  };

  return {
    middleware: middleware,
  }
}

module.exports = middlewareController;
