const { check, body } = require('express-validator');
module.exports = registerData = [ 
    //Aquí incoporé otras validaciones, para que las tengan de guía para sus proyectos  
    check('first_name').isLength({
      min: 1
    }).withMessage('El campo nombre no puede estar vacío'),
    check('last_name').isLength({min: 1   
    }).withMessage('El campo apellido no puede estar vacío'),
    check('email').isEmail().withMessage('Agregar un email válido'),
    
    //Aquí valido el Password   
    check('password').isLength({min: 6 }).withMessage('La contraseña debe tener un mínimo de 6 caractéres al menos una letra y un número'),
    
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
]