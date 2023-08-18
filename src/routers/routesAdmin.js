const path = require("path");
const express = require("express");
const router = express.Router();
const controlAdmin = require('../control/controlAdmin')
const multer = require('multer');

//Almacenamiento Producto

const storageP = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../public/db-images/products'))
  },
  /*acá genera el nombre del archivo*/
  filename: function (req, file, cb) {
    cb(null, 'product-' + Date.now() + path.extname(file.originalname))
  }
});

const uploadP = multer({ storageP });

//Rutas Producto

router.get("/products", controlAdmin.adminProducts.listProducts); // /products (get)
router.get("/products/detail-product/:id", controlAdmin.adminProducts.detailProduct); // /products/:id (get)
router.get("/products/add-product", controlAdmin.adminProducts.addProduct); // /products (get)
router.post("/products/add-product", uploadP.single('image'),controlAdmin.adminProducts.saveProduct); // /products (get)
router.get("/products/modify-product/:id", controlAdmin.adminProducts.modProduct); // /products/:id/edit (get)
router.put("/products/modify-product/:id", uploadP.single('image'), controlAdmin.adminProducts.alterProduct); // /products/:id (put)
router.delete("/products/delete-product/:id", controlAdmin.adminProducts.deleteProduct); // /products/:id (delete)

//Rutas usuario
/*
router.get("/users", controlAdmin.adminUsers.listUsers); // /users (get)
router.get("/users/detail-user/:id", controlAdmin.adminUsers.detailUser); // /users/:id (get)
router.get("/users/add-user", controlAdmin.adminUsers.addUser); // /users (get)
router.post("/users/add-user", uploadU.single('image'),controlAdmin.adminUsers.saveUser); // /users (get)
router.get("/users/modify-user/:id", controlAdmin.adminUsers.modUser); // /users/:id/edit (get)
router.put("/users/modify-user/:id", uploadU.single('image'), controlAdmin.adminUsers.alterUser); // /users/:id (put)
router.delete("/users/delete-user/:id", controlAdmin.adminUsers.deleteUser); // /users/:id (delete)
*/
module.exports = router;