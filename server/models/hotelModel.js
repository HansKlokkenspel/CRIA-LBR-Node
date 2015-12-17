var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

var HotelSchema = Schema({
  name: {
    type: String,
    required: true,
    maxlength: 25,
    minlength: 5
  },
  description: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 10
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  arrangements: [{
    type: Schema.Types.ObjectId,
    ref: 'Arrangement',
    required: true,
  }]
});

HotelSchema.plugin(deepPopulate);

module.exports = mongoose.model('Hotel', HotelSchema);
