const express = require("express");
const router = express.Router();
let controlUser = require('../control/controlUser')
const path = require('path');
const validateLogin = require('../middlewares/auth/validateLogin');
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
// router.get("/register", isUser, controlUser.register.show); 

//RUTAS DE LOGIN
router.get("/", isUser, controlUser.auth.show);
router.get("/login", validateLogin, controlUser.auth.redirectLogin);
router.post("/login", validateLogin, controlUser.auth.enterSession);
router.get("/register", validateLogin, controlUser.auth.redirectLogin);
router.post('/register', uploadUser.single('avatar'), registerData, controlUser.auth.createUser);
router.get('/logout', controlUser.auth.endSession); 
  
//RUTAS DE PERFIL
router.get('/profile', isGuest, isUser, controlUser.profile.show);
router.put('/profile', uploadUser.single('avatar'), controlUser.profile.edit);

//RUTA DE LOGOUT

module.exports = router;



