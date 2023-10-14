const path = require('path');
//Requiero fs ya que debo leer el archivo json de usuarios y verificar si el usuario que se está reistrando existe o no
const fs = require('fs');
//Requiero el paquete expres-validator
const { body, check } = require('express-validator');

const bcrypt = require('bcryptjs');
//const hash = bcrypt.hashSync('mi contraseña');

const db = require('../database/models')
const User = db.Users

//Aquí aperturo mi archivo de usuarios, ya que al registrarse un usuario es conveniente buscar que no exista una ya registrado con el mismo email o id o el campo que utlicen para identificar al usuario.
//let archivoUsers = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json')))

//validaciones login
const validacionesLogin = [
    check('email')
    .isEmail().withMessage('Agregar un email válido'),
    check('password')
    .isLength({min: 6 }).withMessage('La contraseña debe tener un mínimo de 6 caractéres')
  //   ,
  //   body('email').custom( (value) =>{
  //     for (let i = 0; i < archivoUsers.length; i++) {
  //         if (archivoUsers[i].email == value) {
  //             return true    
  //         }
  //     }
  //     return false
  //   }).withMessage('Usuario no se encuentra registrado...')
  //   ,
  
  //   //Aquí valido si la contraseña colocada es la misma a la que tenemos hasheada
  //   body('password').custom( (value, {req}) =>{
  //       for (let i = 0; i < archivoUsers.length; i++) {
  //           if (archivoUsers[i].email == req.body.email) {
  //               if(bcrypt.compareSync(value, archivoUsers[i].password)){
  //                 return true;
  //               }else{
  //                 return false;
  //               }
  //           }
  //       } 
  //   }).withMessage('Usuario o contraseña no coinciden')
  // //})
]

module.exports = validacionesLogin;