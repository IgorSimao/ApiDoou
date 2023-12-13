let mongoose = require("mongoose");
let Schema = mongoose.Schema;


var campanhaShema = new Schema({
    nome:{type: String, required: true},
    categoria:{type: String, required: true},
    descricao:{type: String, required: true},
    meta:{type: Number},
    valor_arrecadado:{type: Number},
    imagem_capa:{type: String, required:true},
    imagens:{type: String},
    criador:{type: String, required: false},
    disponivel:{type: Boolean}
});

module.exports = mongoose.model("campanha", campanhaShema);