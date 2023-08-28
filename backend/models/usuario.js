'use strict'
const mongoose = require('mongoose');

const usuarioEsquema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Usuario = mongoose.model('Usuario', usuarioEsquema);

module.exports = Usuario;

