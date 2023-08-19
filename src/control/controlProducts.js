const path = require("path");
const controlMain = require('./controlMain');

const controlProducts = {    
    products: (req, res) => {
        /*extraigo la lista de productos*/
        const products = controlMain.controlMethods.leerJSON('products.json');  
        /*los envío al front con la vista*/
        res.render('./products/products', { products })
    },
};

module.exports = controlProducts;