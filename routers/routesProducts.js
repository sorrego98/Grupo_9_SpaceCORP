const express = require("express");
const router = express.Router();
const controlProducts = require('../control/controlProducts')

router.get("/", controlProducts.products);
router.get("/add-product", controlProducts.addProducts);
router.get("/modify-product", controlProducts.modifyProducts);

module.exports = router;