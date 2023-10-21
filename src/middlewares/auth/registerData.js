const { check, body } = require('express-validator');
const extensions = [".jpg", ".jpeg", ".png",".gif"]
module.exports = registerData = [ 
    //Aquí incoporé otras validaciones, para que las tengan de guía para sus proyectos  
    check('first_name')
      .isLength({min: 1}).withMessage('El campo nombre no puede estar vacío'),
      
    check('last_name')
      .isLength({min: 1}).withMessage('El campo apellido no puede estar vacío'),
      
    check('user_name')
      .notEmpty().withMessage('El campo nombre de usuario no puede estar vacío').bail()
      .isLength({min: 6}).withMessage('el nombre de usuario no puede tener menos de 6 caracteres'),
    
    check('email')
      .notEmpty().withMessage("email no puede estar vacío.").bail()
      .isEmail().withMessage('Agregar un email válido'),
    
    check('password').
      isLength({min: 8 }).withMessage('La contraseña debe tener un mínimo de 6 caracteres, al menos una letra y un número'),
    
    check('confirm_password')
      .isLength({min: 8 }).withMessage('La confirmación de la contraseña debe tener un mínimo de 6 caractéres').bail(),
    
    body('confirm_password').custom((value, {req}) =>{      
      if (req.body.password !== value){
        throw new Error('Las contraseñas deben ser iguales.')
      }else{
        return true
    }}),
    
    //Aquí obligo a que el usuario seleccione su avatar
    body('avatar').custom(function (value, { req }) {
      if(req.file){
        let ext = image.substr(req.file.filename.lastIndexOf(".")).toLowerCase()
        console.log(extensions.includes(ext))
        if (extensions.includes(ext)) {
          console.log("sin errores")
          return true
        }else{
          throw new Error('Solo debe seleccionar archivos  con extensión JPG, JPEG, PNG o GIF.')
        }
      }else{
        return true;
    }})
]