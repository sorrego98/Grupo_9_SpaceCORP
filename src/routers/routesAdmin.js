const express = require("express");
const router = express.Router();
const controlAdmin = require('../control/controlAdmin');
const controlMain = require('../control/controlMain');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const {uploadSC} = require('../middlewares/multerMiddleware')
const {uploadProduct} = require('../middlewares/multerMiddleware');
const {uploadMember} = require('../middlewares/multerMiddleware');
const {uploadGalery} = require('../middlewares/multerMiddleware');

router.get("/", controlAdmin.adminProducts.generalAdmon); // Opciones de ADMON (get)

//Rutas Productos mediante DB*****************************************************************
//List COMPLETO
router.get("/products/priceType", controlAdmin.adminProducts.listPrices); // Prices List (get)
router.get("/products/categories", controlAdmin.adminProducts.listCategories); // Categories List (get)
router.get("/products/subcategories", controlAdmin.adminProducts.listSubCategories); // SubCategories List (get)
router.get("/products/products", controlAdmin.adminProducts.listProducts); // Products List (get)

//Detail COMPLETO
router.get("/products/subcategories/detail-subcategory/:id", controlAdmin.adminProducts.detailSubCategories); // Subcategory detail (get)
router.get("/products/products/detail-product/:id", controlAdmin.adminProducts.detailProducts); // Product detail (get)

//Create COMPLETO
router.get("/products/categories/add-category",  controlAdmin.adminProducts.addCategories); // Create Category (get)
router.post("/products/categories/add-category", controlAdmin.adminProducts.saveCategories); // Create Category (post)
router.get("/products/priceType/add-price",  controlAdmin.adminProducts.addPrices); // Create Price Type (get)
router.post("/products/priceType/add-price", controlAdmin.adminProducts.savePrices); // Create Price Type (post)
router.get("/products/subcategories/add-subcategory",  controlAdmin.adminProducts.addSubcategories); // Create Subcategory (get)
router.post("/products/subcategories/add-subcategory", uploadSC.single('image'), controlAdmin.adminProducts.saveSubcategories); // Create Subcategory (post)
router.get("/products/products/add-product",  controlAdmin.adminProducts.addProducts); // Create Product (get)
router.post("/products/products/add-product", uploadProduct.single('image'), controlAdmin.adminProducts.saveProducts); // Create Product (post)

//Modify COMPLETO
router.get("/products/priceType/modify-price/:id", controlAdmin.adminProducts.modPrices); // Modify Price Type(get)
router.put("/products/priceType/modify-price/:id", controlAdmin.adminProducts.alterPrices); // Modify Price Type (put)
router.get("/products/categories/modify-category/:id", controlAdmin.adminProducts.modCategories); // Modify Category (get)
router.put("/products/categories/modify-category/:id", controlAdmin.adminProducts.alterCategories); // Modify category (put)
router.get("/products/subcategories/modify-subcategory/:id", controlAdmin.adminProducts.modSubCategories); // Modify SubCategory (get)
router.put("/products/subcategories/modify-subcategory/:id", uploadSC.single('image'),controlAdmin.adminProducts.alterSubCategories); // Modify SubCategory (put)
router.get("/products/products/modify-product/:id", controlAdmin.adminProducts.modProducts); // Modify Product(get)
router.put("/products/products/modify-product/:id", uploadProduct.single('image'),controlAdmin.adminProducts.alterProducts); // Modify Product(put)

//Delete COMPLETO
router.delete("/products/priceType/delete-price/:id",  controlAdmin.adminProducts.destroyPrices); // Delete PriceType (delete)
router.delete("/products/categories/delete-category/:id",  controlAdmin.adminProducts.destroyCategories); // Delete PriceType (delete)
router.delete("/products/subcategories/delete-subcategory/:id",  controlAdmin.adminProducts.destroySubcategories); // Delete Subcategory (delete)
router.delete("/products/products/delete-product/:id",  controlAdmin.adminProducts.destroyProducts); // Delete PriceType (delete)

//Rutas HOME mediante DB*****************************************************************
router.get("/home/staff", controlMain.controlDB.staffList); // Staff List (get)
router.get("/home/galery", controlMain.controlDB.galeryList); // Galery List (get)
router.get("/home/latestProductions", controlMain.controlDB.productionList); // LatestProduction List (get)
router.get("/home/staff/add-member", controlMain.controlDB.addMembers); // Create Member (get)
router.post("/home/staff/add-member", uploadMember.single('image'), controlMain.controlDB.saveMembers); // Create Member (post)
router.get("/home/galery/add-image", controlMain.controlDB.addImage); // Create Image Galery (get)
router.post("/home/galery/add-image", uploadGalery.single('image'), controlMain.controlDB.saveImage); // Create Image Galery (post)
router.get("/home/latestProductions/add-production", controlMain.controlDB.addProduction); // Create Production (get)
router.post("/home/latestProductions/add-production", controlMain.controlDB.saveProduction); // Create Production (post)
router.get("/home/galery/detail-image/:id", controlMain.controlDB.detailGalery); // Galery detail (get)
router.get("/home/staff/detail-member/:id", controlMain.controlDB.detailMember); // Member detail (get)
router.get("/home/latestProductions/detail-production/:id", controlMain.controlDB.detailProduction); // Member detail (get)
router.get("/home/staff/modify-member/:id", controlMain.controlDB.modMembers); // Modify Member (get)
router.put("/home/staff/modify-member/:id", uploadMember.single('image'),controlMain.controlDB.alterMembers); // Modify Member (put)
router.get("/home/galery/modify-image/:id", controlMain.controlDB.modGalery); // Modify Galery (get)
router.put("/home/galery/modify-image/:id", uploadGalery.single('image'),controlMain.controlDB.alterGalery); // Modify Galery (put)
router.get("/home/latestProductions/modify-production/:id", controlMain.controlDB.modProduction); // Modify Production (get)
router.put("/home/latestProductions/modify-production/:id", controlMain.controlDB.alterProduction); // Modify Production (put)
router.delete("/home/staff/delete-member/:id",  controlMain.controlDB.destroyMember); // Delete Member (delete)
router.delete("/home/galery/delete-image/:id",  controlMain.controlDB.destroyGalery); // Delete Galery (delete)
router.delete("/home/latestProductions/delete-production/:id",  controlMain.controlDB.destroyProduction); // Delete Production (delete)

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