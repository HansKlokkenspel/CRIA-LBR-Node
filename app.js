var globalConfig = require('./server/config/utils/globalConfig')();
var routeConfig = require('./server/config/utils/routeConfig')();

var globalRoutes = globalConfig.fileLocations.routers;
var configLocation = globalConfig.fileLocations.config;

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var dbSeed = require(configLocation + 'startup/dbSeed');

var middlewareController = require('./server/controllers/middlewareController')();

var apiRouter = require(globalRoutes + 'apiRoutes')(middlewareController);
var adminRouter = require(globalRoutes + 'adminRoutes')(routeConfig, middlewareController);
var authRouter = require(globalRoutes + 'authRoutes')(routeConfig, middlewareController);
var userRouter = require(globalRoutes + 'userRoutes')(routeConfig, middlewareController);
var bookingRouter = require(globalRoutes + 'bookingRoutes')(routeConfig, middlewareController);
var destinationRouter = require(globalRoutes + 'destinationRoutes')(routeConfig, middlewareController);

var port = process.env.PORT || 8000;

var app = express();
var db = mongoose.connect(globalConfig.mongoDB.url + globalConfig.mongoDB.database);

app.use(express.static(globalConfig.fileLocations.assets));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash());

require(configLocation + 'passport/passport')(app);

var routes = routeConfig.routes;

app.use(routes.api, apiRouter);
app.use(routes.auth, authRouter);
app.use(routes.admin, adminRouter);
app.use(routes.profile, userRouter);
app.use(routes.bookings, bookingRouter);
app.use(routes.destinations, destinationRouter);

app.set('views', globalConfig.fileLocations.views);

app.set('view engine', 'ejs');

/**
 * Makes it so variables 'success_messages' and 'error_messages' will be directly passed into the view.
 * Values for these variables can be supplied through the use of: req.flash('<message_key>', '<message_value>')
 */
app.use(function (req, res, next) {
    res.locals.success_messages = req.flash('success_messages');
    res.locals.error_messages = req.flash('error_messages');
    next();
});

app.get('/', function (req, res) {
    res.render('index', {
        nav: routeConfig.nav,
        user: req.user,
        pages: routeConfig.pages,

    });
});

//start listening on the specified port
app.listen(port, function (err) {
    console.log('running server on port ' + port);
    dbSeed();
});
