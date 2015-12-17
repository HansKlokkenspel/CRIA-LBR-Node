var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
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

DestinationSchema.plugin(deepPopulate);

module.exports = mongoose.model('Destination', DestinationSchema);
