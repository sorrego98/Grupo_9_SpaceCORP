const path = require("path");
const express = require("express");
const router = express.Router();
const controlAPI = require('../../control/api/controlAPI');

//Rutas Producto
router.get("/select/:method", controlAPI.controlAPI.metodoPrueba);
module.exports = router;