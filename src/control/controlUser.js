const path = require("path");
const fs = require('fs');
const bcrypt = require ('bcryptjs');
const multer = require('multer');
let controlMain = require('./controlMain');

//Aquí requiero a la función que trae los errores desde la ruta, de llegar a existir
const { validationResult } = require('express-validator');

const controlUser = {
    login : (req, res) => {
        res.render('../views/auth/login');
    },

    loginProcess: (req,res) =>{
      const errors = validationResult(req);
      if (errors.isEmpty()){
         let archivoUsers =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json')));
         let usuarioLogueado = archivoUsers.find(usuario => usuario.email == req.body.email)
         //console.log(usuarioLogueado);
         delete usuarioLogueado.password;
         req.session.usuario = usuarioLogueado;  //Guardar del lado del servidor
        
         //Aquí voy a guardar las cookies del usuario que se loguea
        if(req.body.recordarme){
          res.cookie('email',usuarioLogueado.email,{maxAge: 1000 * 60 * 60 * 24})
        }
        return res.redirect('./main/home');  
        
      }else{
        //Devolver a la vista los errores
        res.render(path.resolve(__dirname, '../views/auth/login'),{errors:errors.mapped(),old:req.body});        
      }
    },

    logout: (req,res) =>{
        req.session.destroy();
        res.cookie('email',null,{maxAge: -1});
        res.redirect('../views/auth/login')
      },

    register : (req, res) => {
        res.render('../views/auth/register');
    },
};

module.exports = controlUser;