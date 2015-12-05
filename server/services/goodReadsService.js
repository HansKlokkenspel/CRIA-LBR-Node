var http = require('http');

var goodReadsService = function() {
  var getBookById = function(id, cb) {

    var options = {
      host: 'www.goodreads.com',
      path: 'https://www.goodreads.com/book/show/656?format=json&key=PPA0OCTCeRZfb88u3kO0Zw'
    };

    var callback = function(res) {
      var string = '';

      res.on('data', function(data) {
        string += data;
      });

      res.on('end', function() {
        console.log(string);
        // cb(null, str );
      });
    };

    http.request(options, callback).end();
  };

  return {
    getBookById: getBookById
  };
};

module.exports = goodReadsService;
