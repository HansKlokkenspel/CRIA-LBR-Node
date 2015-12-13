var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentSchema = Schema({
  type: {
    type: String,
  },
  paid: {
    type: Boolean,
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model('Payment', PaymentSchema);
