var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleSchema = Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model('Role', RoleSchema);
