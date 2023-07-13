const path = require("path");

const controlCart = {
    showCart :(req, res) => {
        res.render('./cart/product-cart');
    },
};

module.exports = controlCart;