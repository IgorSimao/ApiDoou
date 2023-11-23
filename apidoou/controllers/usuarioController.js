const User = require("../model/usuario");
require("../config/database")();
const crypto = require('crypto-js');

// Chave secreta para criptografia (deve ser mantida em segredo)
const encryptionKey = '5vG43yqz1xIW';

// Função para criptografar dados
function encryptData(data) {
  const ciphertext = crypto.AES.encrypt(data, encryptionKey).toString();
  return ciphertext;
}

// Função para descriptografar dados
function decryptData(ciphertext) {
  const bytes = crypto.AES.decrypt(ciphertext, encryptionKey);
  const originalData = bytes.toString(crypto.enc.Utf8);
  return originalData;
}


module.exports = {
    getAllUsuarios: function(req, res, next){
        User.find().then(users => {
            res.setHeader("content-type", "application/json");
            res.status(200).json(users);
        }).catch(error=> {
            return res.status(404).json({error: "Nenhum usuário cadastrado!", error});
        }) 
    },
    getUsuarioByID: function(req, res, next){
        let id = req.params.id
        User.findById(id).then(user => {
            res.setHeader("content-type", "application/json");
            res.status(200).json(user);
        }).catch(error => {
            return res.status(404).json({error: "Usuário não encontrado!", error});
        })
    },
    addUsuario: async function(req, res, next){
        let nome = req.body.nome;
        let email = req.body.email;
        let cpf = req.body.cpf;
        let telefone = req.body.telefone;
        let senha = req.body.senha;

        if(nome != undefined && email != undefined && telefone != undefined && senha != undefined){
            senhaCriptografada = encryptData(senha);
            
            try {
                const novoUsuario = new User({
                    nome,
                    email,
                    cpf,
                    telefone,
                    senha: senhaCriptografada
                });

                await novoUsuario.save();
                res.status(200).json({msg: "Usuário Adicionado com sucesso!"} );
            } catch (error) {
                console.log(error)
                res.status(500).json({ error: "Erro ao salvar a usuário no banco de dados.", error });
            }
        }
    },
    editarUsuario: function(req, res, next){
        let id = req.params.id
        let nome = req.body.nome;
        let email = req.body.email;
        let cpf = req.body.cpf;
        let telefone = req.body.telefone;


        const updateUsuario = {
            nome,
            email,
            cpf,
            telefone
        };

        User.findByIdAndUpdate(id, updateUsuario, {new: true})
        .then(usuario => {
            if (!usuario) {
                return res.status(404).json({ error: "O ID informado não existe!" });
            }
            res.setHeader("content-type", "application/json");
            res.status(200).json({"msg": "Usuário Atualizado!"});
        })
        .catch(error => {
            return res.status(500).json({ error: "Ocorreu um erro ao atualizar o usuário." });
        });
    },
    editarSenha: function(req, res, next){
        let id = req.params.id
        let senhaAtual = req.body.senhaAtual
        let novaSenha = req.body.novaSenha


        User.findById(id).then(usuario => {
            let senhaAtualDescriptografada = decryptData(usuario.senha);

            if (senhaAtual == senhaAtualDescriptografada){
                let novaSenhaCriptografada = encryptData(novaSenha);
                const updateSenhaUsuario = {
                    senha: novaSenhaCriptografada
                }
                User.findByIdAndUpdate(id, updateSenhaUsuario, {new: true}).then( () => {
                    return res.status(200).json({"msg": "Senha Alterada!"});
                }).catch(error => {
                    return res.status(404).json({error: "Não foi possível alterar a senha!"});
                })
            }else{
                res.status(404).json({error: "Senha Atual Incorreta"});
            }
        }).catch(error => {res.status(404).json({error: "Usuario não encontrado", error});})
    }
}



// nome:{type: String, required: true},
//     email:{type: String, required: true},
//     telefone:{type: String},
//     senha: {type: String, required: true}