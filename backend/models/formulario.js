'use strict'

var mongoose =require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
    name: String,
    lastName: String,
    mail: String,
    phone: Number,
    mss: String
});

module.exports = mongoose.model('Usuario', ProjectSchema);
//guarda el form en la coleccion

