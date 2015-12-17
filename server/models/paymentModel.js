var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentSchema = Schema({
  type: {
    type: String,
    required: true,
    maxlength: 25,
    minlength: 5
  },
  paid: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Payment', PaymentSchema);
