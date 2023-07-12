const path = require("path");

const controlCart = {
    showCart : (req, res) => {
        let htmlPath = path.resolve(__dirname, '../src/views/cart/product-cart.html');
        res.sendFile(htmlPath);
    }
};

module.exports = controlCart;