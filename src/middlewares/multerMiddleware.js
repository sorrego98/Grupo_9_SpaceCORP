const path = require("path");
const multer = require('multer');

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
    cb(null, 'product-' + Date.now() + path.extname(file.originalname))
  }
});

//Almacenamiento Staff
const storageStaff = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../public/db-images/home/members'))
  },
  /*acá genera el nombre del archivo*/
  filename: function (req, file, cb) {
    cb(null, 'member-' + Date.now() + path.extname(file.originalname))
  }
});

//Almacenamiento Galería
const storageGalery = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../public/db-images/home/galery'))
  },
  /*acá genera el nombre del archivo*/
  filename: function (req, file, cb) {
    cb(null, 'galery-' + Date.now() + path.extname(file.originalname))
  }
});

const uploadSC = multer({ storage: storageSubcategory });
const uploadProduct = multer({ storage: storageProduct });
const uploadMember = multer({ storage: storageStaff });
const uploadGalery = multer({ storage: storageGalery });

module.exports = { uploadSC, uploadProduct, uploadMember, uploadGalery}