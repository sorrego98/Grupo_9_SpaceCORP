const express = require("express");
const router = express.Router();
const controlProducts = require('../control/controlProducts')

router.get("/", controlProducts.productsDBJSON);
router.get("/view", controlProducts.products);

module.exports = router;