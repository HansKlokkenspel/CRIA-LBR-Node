var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CountrySchema = Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  destinations: [{
    type: Schema.Types.ObjectId,
    ref: 'Destination',
  }],
});

module.exports = mongoose.model('Country', CountrySchema);
