const express = require("express");
const router = express.Router();
let controlCart = require('../control/controlCart')

router.get("/", controlCart.showCart);


module.exports = router;