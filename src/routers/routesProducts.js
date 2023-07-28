const express = require("express");
const router = express.Router();
const controlProducts = require('../control/controlProducts')

router.get("/", controlProducts.products);

module.exports = router;