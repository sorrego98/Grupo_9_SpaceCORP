const path = require("path");
const fs = require("fs");
let controlMain = require('./controlMain');
const { products } = require("./controlProducts");

const adminProducts = {
    listProducts : (req, res) => {
        const products = controlMain.controlMethods.leerJSON('products.json');
        /*console.log(products)*/
        res.render('./admin/products/list-products',{products})
    },
    addProduct : (req, res) => {
        res.render('./admin/products/add-products')
    },
    saveProduct : (req, res) => {
        const lastId = function() {
            const products = controlMain.controlMethods.leerJSON('products.json');
            const lastProduct = products.pop();
            if(lastProduct){
                return ++lastProduct.id
            }
            return 1
        }

        const products = controlMain.controlMethods.leerJSON('products.json');
        const productId = lastId();
        const newProducts = products.push(productId);
        req.body.image = req.file ? req.file.filename : '';
        let resProducts = JSON.stringify(newProducts, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../data/products.json'), resProducts);
        res.redirect('/admin/products');
    },
    modProduct : (req, res) => {
        const products = controlMain.controlMethods.leerJSON('products.json');
        const product = products.find(product =>
            req.params.id == product.id
        );
        res.render('./admin/products/modify-products', {product})
    },
    detailProduct : (req, res) => {
        const products = controlMain.controlMethods.leerJSON('products.json');
        const product = products.find(product =>
            req.params.id == product.id
        );
        res.render('./admin/products/detail-products', {product})
    },
    alterProduct : (req, res) => {
        const products = controlMain.controlMethods.leerJSON('products.json');
        let arrProducts = [];
        products.forEach(product => {
            if (product.id !== req.params.id){
                arrProducts.push(product);
            }else{
                arrProducts.push(
                    {
                        id: product.id,
                        name: req.body.name,
                        description: req.body.description,
                        image: req.file ? pic = req.file.filename : pic = req.body.oldImage,
                        category: req.body.name,
                        priceType: req.body.profile,
                        price: req.body.price
                    }
                );
            }
        });
        
        let resProducts = JSON.stringify(arrProducts, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../data/products.json'), resProducts);
        res.redirect('/admin/products');
    },
    deleteProduct : (req, res) => {
        const products = controlMain.controlMethods.leerJSON('products.json');
        let arrProducts = [];
        products.forEach(product => {
            if (product.id !== req.params.id){
                arrProducts.push(product);
            }
        });
        
        let resProducts = JSON.stringify(arrProducts, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../data/products.json'), resProducts);
        res.redirect('/admin/products');

    },
    deleteTest : (req, res) => {
        const products = controlMain.controlMethods.leerJSON('products.json');
        const id = req.params.id;
        const filteredItems = products.filter(currentItem => currentItem.id != id);
        let resProducts = JSON.stringify(filteredItems, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../data/products.json'), resProducts);
        res.redirect('/admin/products');
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