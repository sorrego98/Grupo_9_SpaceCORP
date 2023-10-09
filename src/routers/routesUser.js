const express = require("express");
const router = express.Router();
let controlUser = require('../control/controlUser')
const path = require('path');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

//Requiero el paquete expres-validator
const {check, validationResult, body} = require('express-validator');

//Requiero base de datos
const db = require('../database/models')
const User = db.Users

const multer = require('multer');//Requiero Multer, ya que voy a permitir que el usuario que se registre suba su avatar
//Aquí dispongo la información del storage para tratamiento de guardado imagenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../public/db-images/users'))
  },
  filename: function (req, file, cb) {
    cb(null, 'avatar-' + Date.now() + path.extname(file.originalname))
  }
});

//const { check } = require('express-validator');
const upload = multer({ storage })

//Validaciones registro y login
//const validacionesRegistro = require('../middlewares/registerValidationMiddleware');
//const validacionesLogin = require('../middlewares/loginValidationMiddleware');

//RUTAS DE REGISTRO

router.get("/register", guestMiddleware, controlUser.register); 

User.findAll()
    .then((users) => {

router.post('/register', upload.single('avatar'),[ 
//Aquí incoporé otras validaciones, para que las tengan de guía para sus proyectos  
check('first_name').isLength({
  min: 1
}).withMessage('El campo nombre no puede estar vacío'),
check('last_name').isLength({min: 1   
}).withMessage('El campo apellido no puede estar vacío'),
check('email').isEmail().withMessage('Agregar un email válido'),

//Aquí valido el Password   
check('password').isLength({min: 6 }).withMessage('La contraseña debe tener un mínimo de 6 caractéres al menos una letra y un número'),
//Aquí valido si eusuario existe o no en la tabla de usuarios Por el campo email)
body('email').custom(function (value) {
let contador = 0;
for (let i = 0; i < users.length; i++) {
  if (users[i].email == value) {
      contador++;
  }
}
if (contador > 0) {
  return false;   // Si retorno falso no aparece el mensaje de error
} else {
  return true;    //Si retorno true, aparece el mensaje de error
}
}).withMessage('Usuario ya se encuentra registrado'),

//Aquí valido la confimación del password dispuesto por el usuario
check('confirm_password').isLength({min: 6 }).withMessage('La confirmación de la contraseña debe tener un mínimo de 6 caractéres'),

//Aquí valido si las contraseñas son iguales o no
//El ( value ) viene a ser el valor que viaje en el name del del input del campo 
//El valor { req } corresponde a lo que viene desde el formulario

body('confirm_password').custom((value, {req}) =>{
  if(req.body.password == value ){
      return true    // Si yo retorno un true  no se muestra el error     
  }else{
      return false   // Si retorno un false si se muestra el error
  }    
}).withMessage('Las contraseñas deben ser iguales'),

//Aquí obligo a que el usuario seleccione su avatar
body('avatar').custom(function (value, { req }) {
let ext
if(req.file != undefined ){
return true
}else{
ext = ""+path.extname(req.files[0].filename).toLowerCase();
}
//console.log(ext);
if (
ext == ".jpg" ||
ext == ".jpeg" ||
ext == ".png" ||
ext == ".gif"){
    return true;
}
return false;
}).withMessage('Solo debe seleccionar archivos  con extensión JPG, JPEG, PNG o GIF')
],
controlUser.create);
//Aqui en esta ruta envio al controlador el avatar del usuario así como las respectivas validaciones
})
.catch((errors) => {
    console.log(errors);
})

//RUTAS DE LOGIN
router.get("/login", guestMiddleware, controlUser.login);
//Solo ejecuto las validaciones básicas y todas las demas las voy a verificar desde el controlador

router.post("/login", [
body('email').isEmail().withMessage('Ingresa un email válido'),
body('password').isLength({min: 6 }).withMessage('La contraseña debe tener un mínimo de 6 caractéres'),
], controlUser.loginProcess); //agrego ruta por post que va al controlador
  
//RUTAS DE PERFIL
router.get('/profile', authMiddleware, controlUser.profile);
router.get('/profile/modify-user', controlUser.editarPerfil);
router.put('/profile/modify-user', upload.single('avatar'), controlUser.modificarPerfil);

//RUTA DE LOGOUT
router.get('/logout', controlUser.logout); //Esta ruta se activa al momento que el usuario desea salir de la página

module.exports = router;




