var express = require('express');
var router = express.Router();
const user_validator = require('../validator/user_validator');

let controller = require('../controllers/usuarioController')

router.get('/usuario', controller.getAllUsuarios);
router.get('/usuario/:id', controller.getUsuarioByID);
router.post('/usuario', user_validator.manipulateUser,controller.addUsuario);
// router.delete('/usuario/:id', controller.deleteUsuario);
router.put('/usuario/:id', controller.editarUsuario);
router.put('/usuario/novasenha/:id', controller.editarSenha)

module.exports = router;