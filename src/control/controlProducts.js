const path = require("path");
const controlMain = require('./controlMain');
const db = require('../database/models'); /*---> esto está tirando el proyecto*/

const controlProducts = {    
    productsDBJSON: function (req, res) {
        db.Category.findAll({include: [{association: 'subcategories'}]})
        .then( category => res.json(category))    
            /*res.render('./products/products', { products })*/
        .catch(error => res.send("Error presente: " + error));
    },
    products: function (req, res) {
        db.Category.findAll({include: [{association: 'subcategories'}]})
        .then(category => {
            res.render('./products/products', { category })
        })
        .catch(error => res.send("Error presente: " + error));
    },
    detailProductsDBJSON: function (req, res) {
        db.SubCategory.findByPk(req.params.id, {include: [{association: 'products'}]})//{include: [{association: 'subcategories'}]})
        .then( subcategory => res.json(subcategory))    
            /*res.render('./products/products', { products })*/
        .catch(error => res.send("Error presente: " + error));
    },
    detailProducts: function (req, res) {
        db.SubCategory.findByPk(req.params.id, {include: [{association: 'products'}]})//{include: [{association: 'subcategories'}]})
        .then( subcategory => {
            res.render('./products/detail-products', { subcategory })
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