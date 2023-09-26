'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoticiaSchema = new Schema({
  imagen:{
    type: String,
  }, 
  titulo:{
    type:String,
    trim: true,
  }, 
  contenido:
  { type:String,
    trim: true  
  } 
});

module.exports = mongoose.model('Noticia', NoticiaSchema);

