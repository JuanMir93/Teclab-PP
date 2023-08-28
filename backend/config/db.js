const mongoose = require('mongoose');
const dbURL = require ('../config/propiedades').DB;

module.exports = ()=>{
    mongoose.connect(dbURL, {useNewUrlParser:true})
    .then(()=>console.log('Mongo conectado a ${dbURL}'))
    .catch(err => console.log ('Error de conexión ${err}'))

    process.on('SIGINT',()=>{
        mongoose.connect.close (()=>{
            console.log('Mongo está desconectado');
            process.exit(0)
        })
    })
}