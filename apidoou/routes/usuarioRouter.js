var express = require('express');
var router = express.Router();

let controller = require('../controllers/usuarioController')
/* GET users listing. */
router.get('/usuario', controller.getAllUsuarios);
router.get('/usuario/:id', controller.getUsuarioByID);
router.post('/usuario', controller.addUsuario);
// router.delete('/usuario/:id', controller.deleteUsuario);
router.put('/usuario/:id', controller.editarUsuario);
router.put('/usuario/novasenha/:id', controller.editarSenha)

module.exports = router;