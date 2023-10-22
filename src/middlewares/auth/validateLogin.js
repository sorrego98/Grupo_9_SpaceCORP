const { check } = require('express-validator');
module.exports = validateLogin = [        
        check('userMailUserName').
            notEmpty().withMessage('Debes ingresar un email o tu username.'),
        check('userPass').
            notEmpty().withMessage('Debes ingresar una contraseña.').bail()
            .isLength({ min: 6 }).withMessage('Por regla, la contraseña debe tener 6 o más caracteres.')
    ];