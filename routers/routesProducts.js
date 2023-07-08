const express = require("express");
const router = express.Router();
const controlProducts = require('../control/controlProducts')

router.get("/Products", controlProducts.products);

router.get("/productCart", controlProducts.productCart);

module.exports = router;