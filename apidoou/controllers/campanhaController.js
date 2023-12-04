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
    addCampanha: async function(req, res, next){
        let nome = req.body.nome;
        let categoria = req.body.categoria;
        let descricao = req.body.descricao;
        let meta = req.body.meta;
        let valor_arrecadado = req.body.valor_arrecadado;
        let imagem_capa = req.body.imagem_capa;
        let imagens = req.body.imagens;
        let token = req.body.token
        let disponivel = true;
        try {
            const novaCampanha = {
                nome,
                categoria,
                descricao,
                meta,
                valor_arrecadado,
                imagem_capa,
                imagens,
                token,
                disponivel
            }
            await novaCampanha.save();
            res.status(200).json({msg: "Campanha Adicionado com sucesso!"} );
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Erro ao salvar campanha no banco de dados.", error });
        }
  
    },
    editarCampanha: function (req, res, next) {
        let id = req.params.id
        let nome = req.body.nome;
        let categoria = req.body.categoria;
        let descricao = req.body.descricao;
        let meta = req.body.meta;
        let valor_arrecadado = req.body.valor_arrecadado;
        let imagem_capa = req.body.imagem_capa;
        let imagens = req.body.imagens;
        let disponivel = req.body.disponivel;

        const updateCampanha = {
            nome,
            categoria,
            descricao,
            meta,
            valor_arrecadado,
            imagem_capa,
            imagens,
            disponivel
        }

        Campanha.findByIdAndUpdate(id, updateCampanha, {new: true})
        .then(campanha => {
            if(!campanha){
                return res.status(404).json({ error: "O ID informado não existe!"});
            }
            res.setHeader("content-type", "application/json");
            res.status(200).json({"msg": "Campanha Atualizada!"});
        })
    }
}