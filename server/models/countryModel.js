var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CountrySchema = Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        maxlength: 2048,
        minlength: 10
    },
    destinations: [{
        type: Schema.Types.ObjectId,
        ref: 'Destination'
    }],
});

module.exports = mongoose.model('Country', CountrySchema);
