const express = require("express");
const router = express.Router();
const controlProducts = require('../control/controlProducts')

router.get("/", controlProducts.productsDBJSON);
router.get("/view", controlProducts.products);
router.get("/view/:id", controlProducts.detailProductsDBJSON);
router.get("/subcategory/:id", controlProducts.detailProducts);

module.exports = router;