var mongoose = require('mongoose');
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
  role_id: {
    type: Schema.ObjectId,
  },
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
