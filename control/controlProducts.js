const path = require("path");

const controlProducts = {
    products : (req, res) => {
        res.render('./products/products')
    },
    addProducts : (req, res) => {
        res.render('./products/add-products')
    },
    modifyProducts : (req, res) => {
        res.render('./products/modify-products')
    }
};

module.exports = controlProducts;