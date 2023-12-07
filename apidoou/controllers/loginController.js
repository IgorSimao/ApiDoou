require("../config/database")();
const Login = require("../models/login");
const user = require("../controllers/usuarioController");

module.exports = {
    login: async function(req, res, next){
        let email = req.body.email;
        let senha = req.body.senha;

        // let retorno = user.usuarioVerificaCredenciais(email, senha);
        // console.log(retorno)
        const token = await user.usuarioVerificaCredenciais(email, senha)
       if(token){
        return res.status(200).json({token});
       }else{
        return res.status(404).json({"msg": "Ocorreu um erro ao realizar o login! Verifique a senha e e-mail informados."})
       }

    }   
}