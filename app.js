var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

var port = process.env.PORT || 8000;

var nav = [{
  Link: '/books',
  Text: 'Book',
}, {
  Link: '/authors',
  Text: 'Author',
}];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));
require('./src/config/passport')(app);

app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', function(request, response) {
  response.render('index', {
    nav: nav,
  });
});

//start listening on the specified port
app.listen(port, function(err) {
  console.log('running server on port ' + port);
});
