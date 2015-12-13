var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookingSchema = Schema({
  hotel: {
    type: Schema.Types.ObjectId,
    ref: 'Hotel',
  },
  arrangement: {
    type: Schema.Types.ObjectId,
    ref: 'Arrangement',
  },
  payment: {
    type: Schema.Types.ObjectId,
    ref: 'Payment',
  },
  people: {
    type: Number,
  },
});

module.exports = mongoose.model('Booking', BookingSchema);
