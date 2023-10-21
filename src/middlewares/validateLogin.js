const { check } = require('express-validator');
module.exports = validateLogin = [        
        check('data').
            notEmpty().withMessage('Debes ingresar un email o tu username.'),
        check('password').
            notEmpty().withMessage('Debes ingresar una contraseña.').bail()
            .isLength({ min: 6 }).withMessage('Por regla, la contraseña debe tener 6 o más caracteres.')
    ];