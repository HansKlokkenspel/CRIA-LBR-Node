var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

var DestinationSchema = Schema({
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
    hotels: [{
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    }]
});

DestinationSchema.plugin(deepPopulate);

module.exports = mongoose.model('Destination', DestinationSchema);
