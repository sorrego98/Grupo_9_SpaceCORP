const express = require("express");
const router = express.Router();
const controlAdmin = require('../control/controlAdmin')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../public/data'))
    },
    /*acá genera el nombre del archivo*/
    filename: function (req, file, cb) {
        cb(null, 'product-' + Date.now() + path.extname(file.originalname))
    }
  })

const upload = multer({ storage })

router.get("/products", controlAdmin.adminProducts.listProducts);
router.get("/products/add-product", controlAdmin.adminProducts.addProduct);
router.post("/products/add-product", controlAdmin.adminProducts.addProduct);
router.get("/products/modify-product", controlAdmin.adminProducts.modProduct);
router.get("/products/detail-product/:id", controlAdmin.adminProducts.detailProduct);

module.exports = router;