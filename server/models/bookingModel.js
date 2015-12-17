var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookingSchema = Schema({
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    arrangement: {
        type: Schema.Types.ObjectId,
        ref: 'Arrangement',
        required: true
    },
    payment: {
        type: Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
    },
    people: {
        type: Number,
        min: 1,
        required: true
    }
});

module.exports = mongoose.model('Booking', BookingSchema);
