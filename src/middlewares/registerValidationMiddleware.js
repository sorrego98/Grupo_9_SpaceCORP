//Requiero el paquete expres-validator
const { body } = require('express-validator');

const validacionesRegistro = [
    //Aquí incoporé otras validaciones
    body('first_name').isLength({
        min: 1
    }).withMessage('El campo nombre no puede estar vacío'),
    body('last_name').isLength({
        min: 1
    }).withMessage('El campo apellido no puede estar vacío'),
    body('email').isEmail().withMessage('Agregar un email válido'),

    //Aquí valido el Password   
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener un mínimo de 6 caractéres'),

    //Aquí valido la confimación del password dispuesto por el usuario
    body('confirm_password').isLength({ min: 6 }).withMessage('La confirmación de la contraseña debe tener un mínimo de 6 caractéres'),

    //Aquí valido si las contraseñas son iguales o no
    //El ( value ) viene a ser el valor que viaje en el name del del input del campo 
    //El valor { req } corresponde a lo que viene desde el formulario

    body('confirm_password').custom((value, { req }) => {
        if (req.body.password == value) {
            return true    // Si yo retorno un true  no se muestra el error     
        } else {
            return false   // Si retorno un false si se muestra el error
        }
    }).withMessage('Las contraseñas deben ser iguales'),

    //Aquí obligo a que el usuario seleccione su avatar
    body('avatar').custom((value, { req }) => {
        if (req.file != undefined) {
            return true
        }
        return false;
    }).withMessage('Debe elegir su avatar y debe ser un archivo con formato: .JPG ó JPEG ó PNG')
]

module.exports = validacionesRegistro;