var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleSchema = Schema({
  roleName: {
    type: String,
  },
});

module.exports = mongoose.model('Role', RoleSchema);
