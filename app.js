//Pull in Expressjs
var express = require('express');

//Make express usable on the app object
var app = express();

var port = process.env.PORT || 8000;

app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/', function(request, response) {
  response.send('Hello world');
});

app.get('/books', function(request, response) {
  response.send('Hello Books');
});

//start listening on the specified port
app.listen(port, function(err) {
  console.log('running server on port ' + port);
});
