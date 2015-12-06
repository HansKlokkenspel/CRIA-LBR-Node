var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');

var nav = require('./server/config/navStructure');
var bookRouter = require('./server/routes/bookRoutes')(nav);
var adminRouter = require('./server/routes/adminRoutes')(nav);
var authRouter = require('./server/routes/authRoutes')(nav);
var userRouter = require('./server/routes/userRoutes')(nav);

var port = process.env.PORT || 8000;

var app = express();
var db = mongoose.connect('mongodb://localhost/laidbackReizen');

app.use(express.static('public/assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
require('./server/config/passport')(app);

app.use('/auth', authRouter);
app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);

app.set('views', 'server/views');

app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('index', {
    nav: nav,
  });
});

//start listening on the specified port
app.listen(port, function(err) {
  console.log('running server on port ' + port);
});
