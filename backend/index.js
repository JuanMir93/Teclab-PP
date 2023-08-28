'use strict'

var mongoose = require('mongoose');
var propiedades = require('./config/propiedades');
const DB = require ('./config/db');
var app = require('./app');
var port = 3700;
DB();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/Teclab-PP')
        .then(() => {
            console.log ("Conexion a base de datos existosa");

            //Creación del servidor
            app.listen(port, () => {
                console.log("Servidor corriendo correctamente en la url localhost 3700");
            });
        })
        .catch(err=> console.log (err));
        