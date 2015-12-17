var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
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

HotelSchema.plugin(deepPopulate);

module.exports = mongoose.model('Hotel', HotelSchema);
