const express = require("express");
const router = express.Router();
const APIController = require('../../control/api/APIController');

//Rutas Producto
router.get("/:method", APIController.controlAPI.listData);
router.get("/:method/:id", APIController.controlAPI.detailData);
module.exports = router;