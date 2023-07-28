const path = require("path");
const fs = require("fs");
const express = require("express");
const router = express.Router();
const controlAdmin = require('../control/controlAdmin')
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/db-images'))
  },
  /*acá genera el nombre del archivo*/
  filename: function (req, file, cb) {
    cb(null, 'product-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage });

router.get("/products", controlAdmin.adminProducts.listProducts); // /products (get)
router.get("/products/add-product", controlAdmin.adminProducts.addProduct); // /products/create (get)
router.get("/products/detail-product/:id", controlAdmin.adminProducts.detailProduct); // /products/:id (get)
router.get("/products/add-product", controlAdmin.adminProducts.addProduct); // /products (get)
router.post("/products/", controlAdmin.adminProducts.saveProduct); // /products (get)
router.get("/products/modify-product/:id", controlAdmin.adminProducts.modProduct); // /products/:id/edit (get)
router.put("/products/modify-product/:id", upload.single('image'), controlAdmin.adminProducts.alterProduct); // /products/:id (put)
// -------------------- Preguntar a Rodri y a Leo --------------------
// router.get("/products/delete-product/:id", controlAdmin.adminProducts.deleteProduct); // /products/:id (delete) 
// -------------------- Preguntar a Rodri y a Leo --------------------
router.delete("/products/delete-product/:id", controlAdmin.adminProducts.deleteTest);

module.exports = router;