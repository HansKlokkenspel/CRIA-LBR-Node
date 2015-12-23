var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var DestinationSchema = Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
        maxlength: 2048,
        minlength: 10
    },
    hotels: [{
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        //required: true
    }]
});

DestinationSchema.methods.getPopulationPath = function(){
    return 'hotels.arrangements';
};

DestinationSchema.plugin(deepPopulate);
DestinationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Destination', DestinationSchema);
