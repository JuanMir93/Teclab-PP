'use strict'

const {request,response} = require('express');
const nodeMailer = require('nodemailer');

const envioCorreo = (req=request, res=response) =>{
    const body = req.body;
    const{ email,asunto, nombre,telefono, mensaje } = req.body;

    let config = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        post:587,
        auth:{
                user:'',
                pass: ''
        }
    });

    const opciones= {
        from:body.correo,
        subject: body.asunto,
        to: '',
        text:`correo: ${email}\nasunto: ${asunto}\nnombre: ${nombre}\ntelefono: ${telefono}\nmensaje: ${mensaje}`
    };

    config.sendMail(opciones,function(error,result){

        if(error)
            return res.json({
                ok:false,
                msg:error
            });

        return res.json({
            ok:true,
            msg:result
        });
    })
}

module.exports =  {envioCorreo}
