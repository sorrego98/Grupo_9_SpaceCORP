const express = require("express");
const router = express.Router();
let controlUser = require('../control/controlUser')
const path = require('path');
const validateLogin = require('../middlewares/validateLogin');
const registerData = require('../middlewares/auth/registerData');
const loggedUser = require("../middlewares/auth/loggedUser");
const notLoggedUser = require('../middlewares/auth/notLoggedUser');
const {uploadUser} = require('../middlewares/multerMiddleware');

//Requiero el paquete expres-validator
const {check, validationResult, body} = require('express-validator');

//Requiero base de datos
const db = require('../database/models')
const User = db.Users

//RUTAS DE REGISTRO

router.get("/register", loggedUser, controlUser.register); 
router.post('/register', uploadUser.single('avatar'), registerData, controlUser.create);

//RUTAS DE LOGIN
router.get("/login", loggedUser, controlUser.login.show);
router.post("/login", validateLogin, controlUser.login.enterSession);
  
//RUTAS DE PERFIL
router.get('/profile', notLoggedUser, controlUser.profile.show);
router.put('/profile', uploadUser.single('avatar'), controlUser.profile.edit);

//RUTA DE LOGOUT
router.get('/logout', controlUser.logout); //Esta ruta se activa al momento que el usuario desea salir de la página

module.exports = router;




