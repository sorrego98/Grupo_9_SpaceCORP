const express = require("express");
const router = express.Router();
const controlAdmin = require('../control/controlAdmin')

router.get("/products", controlAdmin.adminProducts.listProducts);
router.get("/products/add-product", controlAdmin.adminProducts.addProduct);
router.get("/products/modify-product", controlAdmin.adminProducts.modProduct);

module.exports = router;