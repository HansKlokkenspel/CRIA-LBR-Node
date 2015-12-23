var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var BookingSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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
    created_at: {
        type: Date,
        default: Date.now
    },
    is_paid: {
        type: Boolean,
        default: false
    },
    payment: {
        type: Schema.Types.ObjectId,
        ref: 'Payment'
    },
    people: {
        type: Number,
        min: 1,
        required: true
    }
});

BookingSchema.methods.getPopulationPath = function(){
    return 'hotel arrangement payment';
};


BookingSchema.plugin(deepPopulate);
BookingSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Booking', BookingSchema);
