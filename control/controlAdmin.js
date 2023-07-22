const path = require("path");
let controlMain = require('../control/controlMain')

const adminProducts = {
    listProducts : (req, res) => {
        const products = controlMain.controlMethods.leerJSON('products.json');
        /*console.log(products)*/
        res.render('./admin/products/list-products',{products})
    },
    addProduct : (req, res) => {
        res.render('./admin/products/add-products')
    },
    modProduct : (req, res) => {
        res.render('./admin/products/modify-products')
    }
};

/*const adminUsers = {
    products : (req, res) => {
        res.render('./admin/products/list-products')
    },
    addProducts : (req, res) => {
        res.render('./admin/products/add-products')
    },
    modifyProducts : (req, res) => {
        res.render('./admin/products/modify-products')
    }
};*/

module.exports = {adminProducts /*, adminUsers*/
};