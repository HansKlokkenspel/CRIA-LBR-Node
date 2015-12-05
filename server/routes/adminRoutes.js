var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [{
  title: 'Book 1',
  genre: 'Genre 1',
  author: 'Author 1',
  read: false,
}, {
  title: 'Book 2',
  genre: 'Genre 2',
  author: 'Author 2',
  read: false,
}, {
  title: 'Book 3',
  genre: 'Genre 3',
  author: 'Author 3',
  read: false,
}, {
  title: 'Book 4',
  genre: 'Genre 4',
  author: 'Author 4',
  read: false,
}, ];

var router = function(nav) {
  adminRouter.route('/addBooks')
    .get(function(req, res) {
      var url = 'mongodb://localhost:27017/libraryApp';

      mongodb.connect(url, function(err, db) {
        var collection = db.collection('books');
        collection.insertMany(books, function(err, results) {
          res.send(results);
          db.close();
        });
      });
    });

  return adminRouter;
};

module.exports = router;
