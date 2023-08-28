'use strict'
const Noticia = require('../models/noticia');

var controller = {
saveNoticia: function(req, res){
    var noticia = new Noticia();
    var params = req.body;
     noticia.imagen = params.imagen;
     noticia.titulo = params.titulo;
     noticia.contenido= params.contenido;
    
     
        noticia.save().then((noticiaStored) =>{
         
         if(!noticiaStored){
          return res.status(400).json({
             message: "No se ha podido guardar la noticia"
         });
         }
         res.status(200).json(noticiaStored);
         
     })

     .catch(error => {
         return res.status(500).json({
            
            message: "Error en el servidor"});
     });
 },

 getNoticia: function (req, res){
     var noticiaId = req.params.id;

     if(noticiaId == null)
         return res.status(404).send({
                
             message: "La noticia no existe"
          });

     Noticia.findById(noticiaId).then ((noticia) => {

         if(!noticia)
             return res.status(404).send({       
              message: "La noticia no existe"
         });

         res.status(200).send(noticia);

     })

     .catch((error) => {
         return res.status(500).send({
             message: "Error al devolver los datos"
         });
     });
 },

 updateNoticia: function(req,res){
     var noticiaId = req.params.id;
     var update = req.body;

     Noticia.findByIdAndUpdate(noticiaId, update, {new:true}).then (( noticiaUpdate)=>{
 
         if(!noticiaUpdate) 
             return res.status(404).send({
                message: "No existe noticia para actualizar"
             });

         return res.status(200).send({
             noticia:noticiaUpdate
         });

         
     })

     .catch(error => {
         return res.status(500).send({
             message: "Error al devolver los datos"
         });
     });
 },

 deleteNoticia: function(req,res){
     var noticiaId = req.params.id;

     Noticia.findByIdAndDelete(noticiaId).then ((noticiaRemoved) =>{
         if(!noticiaRemoved)
             return res.status(404).send({
                 message: "No se encuentra la noticia"
         });

         return res.status(200).send({
             noticia:noticiaRemoved
         })
     })

     .catch(error => {
         return res.status(500).send({
             message: "No se pudo eliminar la noticia"
         });
     });
 }
};

module.exports= controller