'use strict'

const express = require('express');

var router = express.Router();

var EnvioController = require('../controllers/correo');

router.post('/envio', EnvioController.envioCorreo);

module.exports = router;
