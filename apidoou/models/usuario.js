let mongoose = require("mongoose");
let Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nome:{type: String, required: true},
    email:{type: String, required: true, unique: true},
    cpf:{type: String, required: true, unique: true},
    telefone:{type: String},
    senha: {type: String, required: true}
});

module.exports = mongoose.model("usuario", usuarioSchema)