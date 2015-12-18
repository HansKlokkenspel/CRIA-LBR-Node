var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    displayName: {
        type: String,
    },
    image: {
        type: String,
    },
    email: {
        type: String,
    },
    local: {
        email: String,
        password: String,
    },
    facebook: {
        type: Object,
    },
    google: {
        type: Object,
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    },
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: 'Booking',
    }],
});

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

UserSchema.plugin(deepPopulate);

module.exports = mongoose.model('User', UserSchema);
