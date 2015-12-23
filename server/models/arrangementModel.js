var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArrangementSchema = Schema({
    name: {
        type: String,
        required: true,
        enum: ['Full pension', 'Half pension', 'Breakfast']
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 2048
    },
    price: {
        type: Number,
        required: true
    },
    people: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    }
});

module.exports = mongoose.model('Arrangement', ArrangementSchema);
