const path = require("path");
const express = require("express");
const router = express.Router();
const controlAdmin = require('../control/controlAdmin');
const multer = require('multer');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

//Almacenamiento Subcategoría

const storageSubcategory = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../public/db-images/products/subcategories'))
  },
  /*acá genera el nombre del archivo*/
  filename: function (req, file, cb) {
    cb(null, 'subcategory-' + Date.now() + path.extname(file.originalname))
  }
});

//Almacenamiento Producto

const storageProduct = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../public/db-images/products/products'))
  },
  /*acá genera el nombre del archivo*/
  filename: function (req, file, cb) {
    cb(null, 'subcategory-' + Date.now() + path.extname(file.originalname))
  }
});

const uploadSC = multer({ storage: storageSubcategory});
const uploadProduct = multer({ storage: storageProduct});

//Rutas mediante DB
//List COMPLETO
router.get("/", controlAdmin.adminProducts.generalAdmon); // Opciones de ADMON (get)
router.get("/products/priceType", controlAdmin.adminProducts.listPrices); // Prices List (get)
router.get("/products/categories", controlAdmin.adminProducts.listCategories); // Categories List (get)
router.get("/products/subcategories", controlAdmin.adminProducts.listSubCategories); // SubCategories List (get)
router.get("/products/products", controlAdmin.adminProducts.listProducts); // Products List (get)

//Detail COMPLETO
router.get("/products/subcategories/detail-subcategory/:id", controlAdmin.adminProducts.detailSubCategories); // Subcategory detail (get)
router.get("/products/products/detail-product/:id", controlAdmin.adminProducts.detailProducts); // Product detail (get)

//Modify FALTA PRODUCTS
router.get("/products/priceType/modify-price/:id", controlAdmin.adminProducts.modPrices); // Modify Price Type(get)
router.put("/products/priceType/modify-price/:id", controlAdmin.adminProducts.alterPrices); // Modify Price Type (put)
router.get("/products/categories/modify-category/:id", controlAdmin.adminProducts.modCategories); // Modify Category Type(get)
router.put("/products/categories/modify-category/:id", controlAdmin.adminProducts.alterCategories); // Modify category (put)
router.get("/products/subcategories/modify-subcategory/:id", controlAdmin.adminProducts.modSubCategories); // Modify SubCategory Type(get)
router.put("/products/subcategories/modify-subcategory/:id", uploadSC.single('image'),controlAdmin.adminProducts.alterSubCategories); // Modify SubCategory Type(put)


//Create FALTA PRODUCTS
router.get("/products/categories/add-category",  controlAdmin.adminProducts.addCategories); // Create Category (get)
router.post("/products/categories/add-category", controlAdmin.adminProducts.saveCategories); // Create Category (post)
router.get("/products/priceType/add-price",  controlAdmin.adminProducts.addPrices); // Create Price Type (get)
router.post("/products/priceType/add-price", controlAdmin.adminProducts.savePrices); // Create Price Type (post)
router.get("/products/subcategories/add-subcategory",  controlAdmin.adminProducts.addSubcategories); // Create Subcategory (get)
router.post("/products/subcategories/add-subcategory", uploadSC.single('image'), controlAdmin.adminProducts.saveSubcategories); // Create Subcategory (post)

//Falta por terminar
router.get("/products/products/add-product",  controlAdmin.adminProducts.addProducts); // Create Product (get)
router.post("/products/products/add-product", uploadProduct.single('image'), controlAdmin.adminProducts.saveProducts); // Create Product (post)

//Delete COMPLETO
router.delete("/products/priceType/delete-price/:id",  controlAdmin.adminProducts.destroyPrices); // Delete PriceType (delete)
router.delete("/products/categories/delete-category/:id",  controlAdmin.adminProducts.destroyCategories); // Delete PriceType (delete)
router.delete("/products/subcategories/delete-subcategory/:id",  controlAdmin.adminProducts.destroySubcategories); // Delete Subcategory (delete)
router.delete("/products/products/delete-product/:id",  controlAdmin.adminProducts.destroyProducts); // Delete PriceType (delete)


// router.get("/products/add-product", authMiddleware, adminMiddleware, controlAdmin.adminProducts.addProduct); // /products (get)
// router.post("/products/add-product", upload.single('image'),controlAdmin.adminProducts.saveProduct); // /products (get)
// router.get("/products/modify-product/:id", authMiddleware, adminMiddleware, controlAdmin.adminProducts.modProduct); // /products/:id/edit (get)
// router.put("/products/modify-product/:id", upload.single('image'), controlAdmin.adminProducts.alterProduct); // /products/:id (put)
// router.delete("/products/delete-product/:id", authMiddleware, adminMiddleware, controlAdmin.adminProducts.deleteProduct); // /products/:id (delete)

/*
//Rutas mediante JSON
router.get("/products", authMiddleware, adminMiddleware, controlAdmin.adminProducts.listProducts); // /products (get)
router.get("/products/detail-product/:id", authMiddleware, adminMiddleware, controlAdmin.adminProducts.detailProduct); // /products/:id (get)
router.get("/products/add-product", authMiddleware, adminMiddleware, controlAdmin.adminProducts.addProduct); // /products (get)
router.post("/products/add-product", upload.single('image'),controlAdmin.adminProducts.saveProduct); // /products (get)
router.get("/products/modify-product/:id", authMiddleware, adminMiddleware, controlAdmin.adminProducts.modProduct); // /products/:id/edit (get)
router.put("/products/modify-product/:id", upload.single('image'), controlAdmin.adminProducts.alterProduct); // /products/:id (put)
router.delete("/products/delete-product/:id", authMiddleware, adminMiddleware, controlAdmin.adminProducts.deleteProduct); // /products/:id (delete)*/

module.exports = router;