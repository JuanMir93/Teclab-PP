'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoticiaSchema = new Schema({
  imagen: String,
  titulo: String,
  contenido: String,
});

module.exports = mongoose.model('Noticia', NoticiaSchema);

