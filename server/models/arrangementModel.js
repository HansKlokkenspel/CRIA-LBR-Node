var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArrangementSchema = Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  people: {
    type: Number,
  },
});

module.exports = mongoose.model('Arrangement', ArrangementSchema);
