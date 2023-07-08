const express = require("express");
const router = express.Router();
let controlUser = require('../control/controlUser')

router.get("/login", controlUser.login);

router.get("/register", controlUser.register);

module.exports = router;