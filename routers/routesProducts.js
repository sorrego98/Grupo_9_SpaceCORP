const express = require("express");
const router = express.Router();
const controlProducts = require('../control/controlProducts')

router.get("/Products", controlProducts.products);

module.exports = router;