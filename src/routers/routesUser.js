const express = require("express");
const router = express.Router();
let controlUser = require('../control/controlUser')
const path = require('path');
const validateLogin = require('../middlewares/validateLogin');
const registerData = require('../middlewares/auth/registerData');
const isUser = require("../middlewares/auth/isUser");
const isGuest = require('../middlewares/auth/isGuest');
const {uploadUser} = require('../middlewares/multerMiddleware');

//Requiero el paquete expres-validator
const {check, validationResult, body} = require('express-validator');

//Requiero base de datos
const db = require('../database/models')
const User = db.Users

//RUTAS DE REGISTRO

router.get("/register", isUser, controlUser.register.show); 
router.post('/register', uploadUser.single('avatar'), registerData, controlUser.register.create);

//RUTAS DE LOGIN
router.get("/login", isUser, controlUser.login.show);
router.post("/login", validateLogin, controlUser.login.enterSession);
  
//RUTAS DE PERFIL
router.get('/profile', isGuest, controlUser.profile.show);
router.put('/profile', uploadUser.single('avatar'), controlUser.profile.edit);

//RUTA DE LOGOUT
router.get('/logout', controlUser.login.endSession); //Esta ruta se activa al momento que el usuario desea salir de la página

module.exports = router;




