var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var HotelSchema = Schema({
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
    rating: {
        type: Number,
        min: 1,
        max: 10,
        default: 10
    },
    destination: {
        type: Schema.Types.ObjectId,
        ref: 'Destination',
    },
    arrangements: [{
        type: Schema.Types.ObjectId,
        ref: 'Arrangement',
    }]
});

HotelSchema.plugin(deepPopulate);
HotelSchema.plugin(mongoosePaginate);

HotelSchema.methods.hasParentPath = function (key) {

    return key === 'destination';
};

HotelSchema.methods.saveParent = function (relationShips, relationShipCount, newHotel, cb) {
    var repo = require('../repositories/modelRepository')('destinationModel');

    repo.findModelById(relationShips['destination'], function (relationResult) {
        relationResult.result.hotels.push(newHotel._id);
        relationResult.result.save(function (err, result) {
            cb({result: newHotel});
        });
    });
};

module.exports = mongoose.model('Hotel', HotelSchema);
