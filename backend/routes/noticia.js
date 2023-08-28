'use strict'

var express = require('express');
var NoticiaController = require('../controllers/noticia');

var router = express.Router();

router.post('/acceso', NoticiaController.saveNoticia);
router.get('/acceso', NoticiaController.getNoticia);
router.put('/acceso/:id', NoticiaController.updateNoticia);
router.delete('/acceso/:id', NoticiaController.deleteNoticia);

module.exports = router;