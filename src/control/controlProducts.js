const path = require("path");
const controlMain = require('./controlMain');
const db = require('../database/models'); /*---> esto está tirando el proyecto*/

const controlProducts = {    
    productsDBJSON: function (req, res) {
        db.Category.findAll()
        .then( products => res.json(products))    
            /*res.render('./products/products', { products })*/
        .catch(error => res.send("Error presente: " + error));
    },
    products: function (req, res) {
        db.Category.findAll()
        .then(products => {
            res.render('./products/products', { products })
        })
        .catch(error => res.send("Error presente: " + error));
    }
};

const controlProductsJSON = {    
    products: (req, res) => {
        /*extraigo la lista de productos*/
        const products = controlMain.controlMethods.leerJSON('products.json');  
        /*los envío al front con la vista*/
        
    },
};

module.exports = controlProducts;


/*
{include: [association: ]}
*/