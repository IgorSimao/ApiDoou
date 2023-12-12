const User = require("../models/usuario");
require("../config/database")();
const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
// const usuario = require("../models/usuario");


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
    generateToken: function(params = {}){
        return jwt.sign(params, authConfig.secret, {expiresIn: 86400});
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
                res.status(200).json({msg: "Usuário Adicionado com sucesso!"});
            } catch (error) {
                if(error.code === 11000){
                   return res.status(400).json({error: "E-mail ou CPF ja cadastrado!"})
                }
                console.log(error)
                return res.status(500).json({ error: "Erro ao salvar a usuário no banco de dados.", error });
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
    },
    getUsuarioByToken: function(token){
        return User.find({token: token})
    },
    
    usuarioVerificaCredenciais: async function(email, senha) {
        try {
            // Use async/await para esperar pela resolução da Promise
            const user = await User.findOne({ email: email });
            // Se não houver resultados
            if (!user) {
                console.log("Usuário não encontrado");
                return false;
            }
    
            // Verifique as credenciais
            const usuarioEmail = user.email;
            const usuarioSenha = user.senha;
    
            if (usuarioEmail == email) {
                console.log("Verificação de email bem-sucedida");
                const senhaAtualDescriptografada = decryptData(usuarioSenha);
    
                if (senhaAtualDescriptografada == senha) {
                    console.log("Verificação de senha bem-sucedida");
                    
                    token = this.generateToken({id: User.id})
                    return token;
                } else {
                    console.log("Senha incorreta");
                    return false;
                }
            } else {
                console.log("Email incorreto");
                return false;
            }
        } catch (error) {
            console.error("Erro ao verificar credenciais:", error);
            return false;
        }
    }
}



// nome:{type: String, required: true},
//     email:{type: String, required: true},
//     telefone:{type: String},
//     senha: {type: String, required: true}