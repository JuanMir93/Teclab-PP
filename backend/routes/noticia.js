var express = require('express');
var Noticia = require('../controllers/noticia');

var router = express.Router();

router.post('/acceso',Noticia.fileUpload, Noticia.add);
router.get('/acceso', Noticia.list);
router.get('/acceso/:id', Noticia.show);
router.put('/acceso/:id',Noticia.fileUpload, Noticia.update);
router.delete('/acceso/:id', Noticia.delete);


module.exports = router;