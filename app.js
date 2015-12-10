var globalConfig = require('./server/config/utils/globalConfig')();

var globalRoutes = globalConfig.fileLocations.routers;
var configLocation = globalConfig.fileLocations.config;

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var dbSeed = require(configLocation + 'startup/dbSeed');

var nav = require(configLocation + 'navStructure');

var bookRouter = require(globalRoutes + 'bookRoutes')(nav);
var adminRouter = require(globalRoutes + 'adminRoutes')(nav);
var authRouter = require(globalRoutes + 'authRoutes')(nav);
var userRouter = require(globalRoutes + 'userRoutes')(nav);

var port = process.env.PORT || 8000;

var app = express();
var db = mongoose.connect(globalConfig.mongoDB.url + globalConfig.mongoDB.database);

app.use(express.static(globalConfig.fileLocations.assets));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
require(configLocation + 'passport/passport')(app);

var routes = globalConfig.routes;

app.use(routes.auth, authRouter);
app.use(routes.admin, adminRouter);
app.use(routes.user, userRouter);

app.set('views', globalConfig.fileLocations.views);

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index', {
    nav: nav,
  });
});

//start listening on the specified port
app.listen(port, function(err) {
  console.log('running server on port ' + port);
  dbSeed();
});
