var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentSchema = Schema({
    type: {
        type: String,
        required: true,
        maxlength: 25
    },
    paid: {
        type: Boolean,
        required: true
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
});

PaymentSchema.pre('save', function(next) {
    var currentDate = new Date();

    this.updated_at = currentDate;

    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

module.exports = mongoose.model('Payment', PaymentSchema);
