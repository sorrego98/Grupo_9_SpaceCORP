const path = require("path");

const controlProducts = {
    products : (req, res) => {
        let htmlPath = path.resolve(__dirname, '../src/views/products/products.html');
        res.sendFile(htmlPath);
    },
    productCart : (req, res) => {
        let htmlPath = path.resolve(__dirname, '../src/views/products/productCart.html');
        res.sendFile(htmlPath);
    },
};

module.exports = controlProducts;