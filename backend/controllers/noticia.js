'use strict'
const multer = require('multer');
const multerConfig = require('../../utils/multerConfig');

const Noticia = require('../models/noticia');

const upload = multer(multerConfig).single('imagen');

exports.fileUpload = (req,res,next) =>{
    upload(req,res, function(error){
        if (error){
            console.error("Error en la carga de archivos:", error);
            return res.status(500).json({ message: 'Error en la carga de archivos' });
        }
        return next();
    });
};

//agregar noticia
exports.add= async(req, res) =>{
    const noticia = new Noticia(req.body);

    try{
        if (req.file && req.file.filename){
            noticia.imagen = req.file.filename;
        }
        await noticia.save();
        res.status(200).json({
            message: 'Nueva noticia agregada'
        });    
    }catch (error){
     if(error.code === 11000){
       res.status(400).json({
           message: `Ya existe la noticia con la imagen: ${req.body.imagen}`,
        });
    }
  }
};

// mostrar la lista de noticias
exports.list= async(req, res) =>{
    try{
    const noticia = await Noticia.find({});
    res.json(noticia);
    }catch (error){
        console.log(error);
        res.status(504).send;
        next();
    }
};

//Leer noticia 
exports.show= async(req, res,next) =>{
    try{
    const noticia = await Noticia.findOneAndUpdate(req.params.id);
        if(!noticia){
            res.status(404).json({
                message: 'La noticia no existe'
            });
    }
    res.json(noticia);
    }catch (error){
        console.log(error);
        res.status(400).json({
            message: 'Error al procesar la petición'
        })
    }
};

//Actualizar noticia

exports.update = async (req, res, next) => {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          message: 'ID de noticia no válido',
        });
      }
  
      let nuevaNoticia = req.body;
  
      if (req.file && req.file.filename) {
        nuevaNoticia.imagen = req.file.filename;
      } else {
        const noticia = await Noticia.findById(req.params.id);
        nuevaNoticia.imagen = noticia.imagen;
      }
  
      const noticiaActualizada = await Noticia.findByIdAndUpdate(
        { _id: req.params.id },
        nuevaNoticia,
        { new: true }
      );
  
      res.json({
        message: 'Noticia actualizada correctamente',
      });
    } catch (error) {
      res.status(400).json({
        message: 'Error al procesar la petición',
      });
    }
  };

//Eliminar noticia

exports.delete= async(req, res,next) =>{
    try{
     await Noticia.findOneAndDelete({ _id: req.params.id  });
        res.json({
            message: 'La noticia ha sido eliminada'
        });
    }catch (error){
        res.status(400).json({
            message: 'La noticia no existe'
        });
    }
};
