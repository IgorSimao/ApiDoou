require("../config/database")();
const Login = require("../models/login");
const user = require("../controllers/usuarioController");

module.exports = {
    login: function(req, res, next){
        let email = req.body.email;
        let senha = req.body.senha;

        
       if(user.usuarioVerificaCredenciais(email, senha)){
        return res.status(200).json({"msg": "Login autorizado!"});
       }else{
        return res.status(404).json({"msg": "Ocorreu um erro ao realizar o login! Verifique a senha e e-mail informados."})
       }

    }   
}