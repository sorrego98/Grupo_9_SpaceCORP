const express = require("express");
const router = express.Router();
let controlUser = require('../control/controlUser')
const path = require('path');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

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

const upload = multer({ storage })

//Validaciones registro y login
const validacionesRegistro = require('../middlewares/registerValidationMiddleware');
const validacionesLogin = require('../middlewares/loginValidationMiddleware');

router.get("/register", guestMiddleware, controlUser.register); 
router.post('/register', upload.single('avatar'), validacionesRegistro, controlUser.create);//Aqui en esta ruta envio al controlador el avatar del usuario así como las respectivas validaciones
router.get("/login", guestMiddleware, controlUser.login);
router.post("/login", validacionesLogin, controlUser.loginProcess); //agrego ruta por post que va al controlador
router.get('/profile', authMiddleware, controlUser.profile);
router.get('/logout', controlUser.logout); //Esta ruta se activa al momento que el usuario desea salir de la página

module.exports = router;




