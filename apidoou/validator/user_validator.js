const {checkSchema} = require('express-validator');

// nome:{type: String, required: true},
//     email:{type: String, required: true, unique: true},
//     cpf:{type: String, required: true, unique: true},
//     telefone:{type: String},
//     senha: {type: String, required: true},

module.exports = {
    manipulateUser: checkSchema({
        nome: {
            notEmpty: true,
            trim: true,
            errorMessage: "O nome precisa ser preenchido!"
        },
        email: {
            notEmpty: true,
            trim: true,
            errorMessage: "O E-mail precisa ser preenchido!"
        },
        cpf: {
            notEmpty: true,
            trim: true,
            errorMessage: "O CPF precisa ser preenchido!"
        },
        telefone: {
            notEmpty: true,
            trim: true,
            errorMessage: "O telefone precisa ser preenchido!"
        },
        senha: {
            trim: true,
            isLength: {
                options: {min: 6}
            },
            errorMessage: "A senha não pode ser vazia e precisa ter no mínimo 6 caracteres"
        }
    })
}

