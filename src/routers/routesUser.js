const express = require("express");
const router = express.Router();
let controlUser = require('../control/controlUser')
const path = require('path');

//Requiero fs ya que debo leer el archivo json de usuarios y verificar si el usuario que se está reistrando existe o no
const fs = require ('fs');

//Requiero Multer, ya que voy a permitir que el usuario que se registre suba su avatar
const multer = require('multer');
//Aquí dispongo la información del storage para tratamiento de guardado imagenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../public/db-images'))
  },
  /*acá genera el nombre del archivo*/
  filename: function (req, file, cb) {
    cb(null, 'product-' + Date.now() + path.extname(file.originalname))
  }
});

const upload= multer({ storage })

//Requiero el paquete para comparar las contraseñas  que tengo hash (Pueden instalar el paquete bcrypt o bcryptjs)
const bcrypt = require('bcryptjs');
//const hash = bcrypt.hashSync('mi contraseña');

//Requiero el paquete expres-validator
const { body } = require('express-validator');

//Aquí aperturo mi archivo de usuarios, ya que al registrarse un usuario es conveniente buscar que no exista una ya registrado con el mismo email o id o el campo que utlicen para identificar al usuario.
let archivoUsers =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json')))

//validaciones login
const validacionesLogin = [
    body('email').isEmail().withMessage('Agregar un email válido'),
    body('password').isLength({min: 6 }).withMessage('La contraseña debe tener un mínimo de 6 caractéres'),
    body('email').custom( (value) =>{
      for (let i = 0; i < archivoUsers.length; i++) {
          if (archivoUsers[i].email == value) {
              return true    
          }
      }
      return false
    }).withMessage('Usuario no se encuentra registrado...'),
  
    //Aquí valido si la contraseña colocada es la misma a la que tenemos hasheada
    body('password').custom( (value, {req}) =>{
        for (let i = 0; i < archivoUsers.length; i++) {
            if (archivoUsers[i].email == req.body.email) {
                if(bcrypt.compareSync(value, archivoUsers[i].password)){
                  return true;
                }else{
                  return false;
                }
            }
        }
        
    }).withMessage('Usuario o contraseña no coinciden'),
]

router.get("/login", controlUser.login);
//agrego ruta por post que va al controlador
router.post("/login", validacionesLogin, controlUser.loginProcess);
//Esta ruta se activa al momento que el usuario desea salir de la página
router.get('/logout', controlUser.logout);
router.get("/register", controlUser.register);

module.exports = router;