'use strict'

const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const secretKey = 'asd123456'; // Replace this with your own secret key

var controller = {
    loginUsuario: function (req, res, next){
        
        const usuarioDatos = {
            usuario:req.body.usuario,
            password:req.body.password
        }
        Usuario.findOne({usuario: usuarioDatos.usuario}).then ((verificarUsuario)=>{
            //Usuario no existe
            if(!verificarUsuario){
                res.status(404).send('El usuario no existe');
            }
            if(verificarUsuario){
                const resPassword = bcrypt.compareSync(usuarioDatos.password, verificarUsuario.password);
               if (resPassword){
            const expiresIn = '1h'; // Tiempo de expiración del token, ej.: '1h', '24h', '7d'
            const token = jwt.sign({ userId: verificarUsuario._id },secretKey,{ expiresIn });
                res.send({ 
                    usuario: usuarioDatos.usuario,
                    token: token,
                    expiresIn: expiresIn
                });
               }else{
                //Password incorrecto
                res.status(409).send('Contraseña incorrecta');
                }
            }
        })
        .catch(error=>{
            res.status(500).send('Error al autenticar usuario');
        });
    },
    
  
    saveUsuario: function(req, res){
       var usuario = new Usuario();
       var params = req.body;
        usuario.usuario = params.usuario;
        usuario.password=bcrypt.hashSync(req.body.password);
       
        
         usuario.save().then((usuarioStored) =>{
            
            if(!usuarioStored){
             return res.status(400).send({
                message: "No se ha podido guardar el usuario"
            });
            }
            const expiresIn = '1h';
            const token = jwt.sign({ userId: usuarioStored._id },secretKey,{ expiresIn:expiresIn });
            return res.status(200).send({
                usuario:usuarioStored,
                token: token,
                expiresIn: expiresIn
            })
            
        })

        .catch(error => {
            return res.status(500).send({
               
               message: "Error en el servidor"});
        });
    },

    getUsuario: function (req, res){
        var usuarioId = req.params.id;

        if(usuarioId == null)
            return res.status(404).send({
                   
                message: "El usuario no existe"
             });

        Usuario.findById(usuarioId).then ((usuario) => {

            if(!usuario)
                return res.status(404).send({       
                 message: "El usuario no existe"
            });

            return res.status(200).send({
                usuario
            })

        })

        .catch((error) => {
            return res.status(500).send({
                message: "Error al devolver los datos"
            });
        });
    },

    updateUsuario: function(req,res){
        var usuarioId = req.params.id;
        var update = req.body;

        Usuario.findByIdAndUpdate(usuarioId, update, {new:true}).then (( usuarioUpdate)=>{
    
            if(!usuarioUpdate) 
                return res.status(404).send({
                   message: "No existe usuario para actualizar"
                });

            return res.status(200).send({
                usuario:usuarioUpdate
            });

            
        })

        .catch(error => {
            return res.status(500).send({
                message: "Error al devolver los datos"
            });
        });
    },

    deleteUsuario: function(req,res){
        var usuarioId = req.params.id;

        Usuario.findByIdAndRemove(usuarioId).then ((usuarioRemoved) =>{
            if(!usuarioRemoved)
                return res.status(404).send({
                    message: "No se encuentra el usuario"
            });

            return res.status(200).send({
                usuario:usuarioRemoved
            })
        })

        .catch(error => {
            return res.status(500).send({
                message: "No se puede eliminar el usuario"
            });
        });
    }
    
};

module.exports = controller;