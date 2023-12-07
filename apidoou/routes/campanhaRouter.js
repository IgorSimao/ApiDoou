var express = require('express');
var router = express.Router();

let controller = require('../controllers/campanhaController')
const middleware = require('../middlewares/auth')

router.get('/campanha', controller.getAllCampanhas);
router.post('/campanha', middleware.verificaToken, controller.addCampanha);

module.exports = router;