'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');

var router = express.Router();

router.post('/save-usuario', UsuarioController.saveUsuario);
router.get('/usuario/:id?', UsuarioController.getUsuario);
router.put('/usuario/:id', UsuarioController.updateUsuario);
router.delete('/usuario/:id', UsuarioController.deleteUsuario);
router.post('/login', UsuarioController.loginUsuario);

module.exports = router;