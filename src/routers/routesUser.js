const express = require("express");
const router = express.Router();
const path = require("path");   //引入path模块

//paquete para comparar contraseñas
 //引入加密模块
// paquete para leer el archivo json

// paquete para subir archivos
const multer = require('multer');   //引入文件上传模块
//Paquete express validator
const {body} = require('express-validator');  //引入验证模块

//requiero el modulo de controladores
const controlUser = require(path.resolve(__dirname, "../control/controlUser.js"));




//uso de multer para la carga de imagenes

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../../public/db-images/users"));
    },
    filename: function (req, file, cb) {
        cb(null, 'avatar' + '-' + Date.now()+ path.extname(file.originalname));      
    }
});

const upload = multer({ storage: storage })

//Validaciones login



//Validaciones registro

const validacionesRegistro = [
    //Aquí incoporé otras validaciones
    body('first_name').isLength({
          min: 1
        }).withMessage('El campo nombre no puede estar vacío'),
      body('last_name').isLength({min: 1
        }).withMessage('El campo apellido no puede estar vacío'),
      body('email').isEmail().withMessage('Agregar un email válido'),
  
      //Aquí valido el Password   
      body('password').isLength({min: 6 }).withMessage('La contraseña debe tener un mínimo de 6 caractéres'),
      
      //Aquí valido la confimación del password dispuesto por el usuario
      body('confirm_password').isLength({min: 6 }).withMessage('La confirmación de la contraseña debe tener un mínimo de 6 caractéres'),
  
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
      body('avatar').custom((value, {req}) =>{
          if(req.file != undefined){
              return true
          }
          return false;
      }).withMessage('Debe elegir su avatar y debe ser un archivo con formato: .JPG ó JPEG ó PNG')
    ]



// Métodos en nuestros controladores: index - show - edit - delete 
router.get('/login', controlUser.login);


router.get('/register', controlUser.registro);

//Aqui en esta ruta envio al controlador el avatar del usuario así como las respectivas validaciones

router.post('/register', upload.single('avatar'),validacionesRegistro, controlUser.create);

  //Esta es la ruta que se activa al momento que el usuario desea salir de la página
  router.get('/logout', controlUser.logout);
module.exports = router;

