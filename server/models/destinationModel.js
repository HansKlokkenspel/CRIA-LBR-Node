var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DestinationSchema = Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  hotels: [{
    type: Schema.Types.ObjectId,
    ref: 'Hotel',
  }],
});

module.exports = mongoose.model('Destination', DestinationSchema);
