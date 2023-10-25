const path = require("path");
const express = require("express");
const router = express.Router();
const productsAPIController = require('../../control/api/productsAPIController');

//Rutas Producto
router.get("/:method", productsAPIController.controlAPI.listData);
router.get("/:method/:id", productsAPIController.controlAPI.detailData);
module.exports = router;