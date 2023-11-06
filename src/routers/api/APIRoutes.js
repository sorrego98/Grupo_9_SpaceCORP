const express = require("express");
const router = express.Router();
const APIController = require('../../control/api/APIController');
const cors = require('cors');

//Rutas Producto
router.get("/:method", cors(), APIController.controlAPI.listData);
router.get("/:method/:id", cors(), APIController.controlAPI.detailData);
module.exports = router;