var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HotelSchema = Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
  },
  arrangements: [{
    type: Schema.Types.ObjectId,
    ref: 'Arrangement',
  }],
});

module.exports = mongoose.model('Hotel', HotelSchema);
