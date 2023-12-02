var express = require('express');
var router = express.Router();

let controller = require('../controllers/loginController')

router.post('/login', controller.login());
