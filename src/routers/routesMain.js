const express = require("express");
const router = express.Router();
let controlMain = require('../control/controlMain')

router.get("/", controlMain.controlMain.home);
router.get("/contact", controlMain.controlMain.contact);
router.get("/not-found", controlMain.controlMain.notFound);

module.exports = router;