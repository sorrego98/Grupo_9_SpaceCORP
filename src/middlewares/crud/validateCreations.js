const validImageExtensions = ['jpg', 'jpeg', 'png'];
const { check, body } = require('express-validator');
module.exports = validateCreations = [        
        check('memberName').
            notEmpty().withMessage('Debes ingresar un nombre.'),
        check('memberPosition').
            notEmpty().withMessage('Debes ingresar un cargo.'),
        check('memberIG').
            notEmpty().withMessage('Debes usuario de Instagram.'),
        check('memberIGURL').
            notEmpty().withMessage('Debes ingresar un email o tu username.').bail()
            .isURL().withMessage('Debes ingresar una URL válida'),
        body('imageMember')
            .custom((value, { req }) => {
              if (req.file) {
                const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
                if (validImageExtensions.includes(fileExtension)) {
                  return true; // La extensión es válida
                } else {
                  return false; // La extensión no es válida
                }
              } else {
                return true; // No se ha subido ningún archivo
              }
            })
            .withMessage('La imagen debe ser un archivo en formato JPG, JPEG o PNG')
    ];