let mongoose = require("mongoose");
let Schema = mongoose.Schema;

var loginSchema = new Schema({
    email:{type: String, require: true},
    senha:{type: String, require: true}
});

module.exports = mongoose.model("login", loginSchema);