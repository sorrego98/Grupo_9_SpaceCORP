const path = require("path");
const express = require("express");
const router = express.Router();
const controllerAPI = require('../../control/api/userAPIController');

//Rutas User
router.get("/", controllerAPI.list);
router.get("/:id", controllerAPI.detail);
module.exports = router;