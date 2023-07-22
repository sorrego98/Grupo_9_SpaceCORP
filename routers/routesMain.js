const express = require("express");
const router = express.Router();
let controlMain = require('../control/controlMain')

router.get("/", controlMain.controlMain.home);
router.get("/contact", controlMain.controlMain.contact);

module.exports = router;