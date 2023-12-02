require("../config/database")();
const Campanha = require("../models/campanha");


module.exports = {
    getAllCampanhas: function(req, res, next) {
        Campanha.find().then(campanha => {
            res.setHeader("content-type", "application/json");
            res.status(200).json(campanha);
        }).catch(error=> {
            return res.status(404).json({error: "Nenhuma campanha para exibir no momento!", error});
        })
    },
    getByCategoria: function(req, res, next) {
        Campanha.find({categoria: req.body.categoria}).then(campanha => {
            res. res.setHeader("content-type", "application/json");
            res.status(200).json(campanha);
        }).catch(error => {
            return res.status(404).json({error: "Nenhuma campanha para exibir no momento!", error});
        })
    },
    getCampanhaByID: function(req, res, next){
        let id = req.params.id
        Campanha.findById(id).then(user => {
            res.setHeader("content-type", "application/json");
            res.status(200).json(Campanha);
        }).catch(error => {
            return res.status(404).json({error: "Campanha não encontrada!", error});
        })
    },
    addCampanha: function(req, res, next){
        let nome = req.body.nome;
        let categoria = req.body.categoria;
        let descricao = req.body.descricao;
        let meta = req.body.meta;
        let valor_arrecadado = req.body.valor_arrecadado;
        let imagem_capa = req.body.imagem_capa;
        let imagens = req.body.imagens;
        
    //     valor_arrecadado:{type: Number},
    // imagem_capa:{type: String, required:true},
    // imagens:{type: String},
    // criador:{type: String, required: true}
    }
}