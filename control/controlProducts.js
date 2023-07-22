const path = require("path");

const controlProducts = {
    products : (req, res) => {
        res.render('./products/products')
    }
};

module.exports = controlProducts;