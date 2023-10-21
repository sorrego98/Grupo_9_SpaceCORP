const { check } = require('express-validator');
module.exports = validateLogin = [        
        check('email').
            notEmpty().withMessage('Debes ingresar un email.').bail()
            .isEmail().withMessage('El dato ingresado, no corresponde a un formato de email válido.'),
        check('password').
            notEmpty().withMessage('Debes ingresar una contraseña.').bail()
            .isLength({ min: 6 }).withMessage('Por regla, la contraseña debe tener 6 o más caracteres.')
    ];