'use strict'

var express = require('express');
var bodyParser = require('body-parser');
let cors =require('cors');
const bodyParserJSON = bodyParser.json();

var app = express();

//cargar archivos de rutas
var usuario_routes = require('./routes/usuario');
var correo_routes = require('./routes/correo');
var noticia_routes = require('./routes/noticia');

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(bodyParserJSON);

//CORS
app.use(cors());


//rutas
app.use('/api', usuario_routes);
app.use('/api', correo_routes);
app.use('/api', noticia_routes)


// exportar 
module.exports = app;
