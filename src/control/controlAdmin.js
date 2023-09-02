const path = require("path");
const fs = require("fs");
let controlMain = require('./controlMain');
const { products } = require("./controlProducts");
const { users } = require("./controlUser");
//const db = require('../database/models'); ---> esto está tirando el proyecto

const adminProducts = {
    metodoPrueba: 1,
    listProducts: (req, res) => {
        const products = controlMain.controlMethods.leerJSON('products.json');
        res.render('./admin/products/list-products', { products })
    },
    addProduct: (req, res) => {
        res.render('./admin/products/add-products')
    },
    saveProduct: (req, res) => {
        const products = controlMain.controlMethods.leerJSON('products.json');
        const lastProduct = products.pop();
        products.push(lastProduct);
        const newProduct = {
            id: parseInt(lastProduct.id) +1,
            name: req.body.name,
            description: req.body.description,
            image: req.file.filename,
            category: req.body.name,
            priceType: req.body.profile,
            price: req.body.price
        }
        products.push(newProduct);

        let resProducts = JSON.stringify(products, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../data/products.json'), resProducts);
        res.redirect('/admin/products');
    },
    modProduct: (req, res) => {
        const products = controlMain.controlMethods.leerJSON('products.json');
        const product = products.find(product =>
            parseInt(req.params.id) === product.id
        );
        res.render('./admin/products/modify-products', { product })
    },
    detailProduct: (req, res) => {
        const products = controlMain.controlMethods.leerJSON('products.json');
        const product = products.find(product =>
            parseInt(req.params.id) === product.id
        );
        res.render('./admin/products/detail-products', { product })
    },
    alterProduct: (req, res) => {
        const products = controlMain.controlMethods.leerJSON('products.json');
        let pic = "";
        let arrProducts = [];
        products.forEach(product => {
            if (product.id !== parseInt(req.params.id)) {
                arrProducts.push(product);
            } else {    
                console.log(product.image)
                if(req.file){
                    pic = req.file.filename
                    try {
                        fs.unlinkSync(path.resolve(__dirname, '../../public/db-images/products/', product.image));             
                      } catch (e) {                        
                      }

                }else{
                    pic = req.body.oldImage

                }
                arrProducts.push(
                    {
                        id: product.id,
                        name: req.body.name,
                        description: req.body.description,
                        image: pic,
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
    deleteProduct: (req, res) => {
        const products = controlMain.controlMethods.leerJSON('products.json');
        const id = parseInt(req.params.id);
        const deleteProduct = products.find(product => product.id == id);
        const filteredProducts = products.filter(currentProduct => currentProduct.id !== id);
        let resProducts = JSON.stringify(filteredProducts, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../data/products.json'), resProducts);
        fs.unlinkSync(path.resolve(__dirname, '../../public/db-images/products/', deleteProduct.image));
        res.redirect('/admin/products');
    }

};

const adminProductsJSON = {
    listProducts: (req, res) => {
        const products = controlMain.controlMethods.leerJSON('products.json');
        res.render('./admin/products/list-products', { products })
    },
    addProduct: (req, res) => {
        res.render('./admin/products/add-products')
    },
    saveProduct: (req, res) => {
        const products = controlMain.controlMethods.leerJSON('products.json');
        const lastProduct = products.pop();
        products.push(lastProduct);
        const newProduct = {
            id: parseInt(lastProduct.id) +1,
            name: req.body.name,
            description: req.body.description,
            image: req.file.filename,
            category: req.body.name,
            priceType: req.body.profile,
            price: req.body.price
        }
        products.push(newProduct);

        let resProducts = JSON.stringify(products, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../data/products.json'), resProducts);
        res.redirect('/admin/products');
    },
    modProduct: (req, res) => {
        const products = controlMain.controlMethods.leerJSON('products.json');
        const product = products.find(product =>
            parseInt(req.params.id) === product.id
        );
        res.render('./admin/products/modify-products', { product })
    },
    detailProduct: (req, res) => {
        const products = controlMain.controlMethods.leerJSON('products.json');
        const product = products.find(product =>
            parseInt(req.params.id) === product.id
        );
        res.render('./admin/products/detail-products', { product })
    },
    alterProduct: (req, res) => {
        const products = controlMain.controlMethods.leerJSON('products.json');
        let pic = "";
        let arrProducts = [];
        products.forEach(product => {
            if (product.id !== parseInt(req.params.id)) {
                arrProducts.push(product);
            } else {    
                console.log(product.image)
                if(req.file){
                    pic = req.file.filename
                    try {
                        fs.unlinkSync(path.resolve(__dirname, '../../public/db-images/products/', product.image));             
                      } catch (e) {                        
                      }

                }else{
                    pic = req.body.oldImage

                }
                arrProducts.push(
                    {
                        id: product.id,
                        name: req.body.name,
                        description: req.body.description,
                        image: pic,
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
    deleteProduct: (req, res) => {
        const products = controlMain.controlMethods.leerJSON('products.json');
        const id = parseInt(req.params.id);
        const deleteProduct = products.find(product => product.id == id);
        const filteredProducts = products.filter(currentProduct => currentProduct.id !== id);
        let resProducts = JSON.stringify(filteredProducts, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../data/products.json'), resProducts);
        fs.unlinkSync(path.resolve(__dirname, '../../public/db-images/products/', deleteProduct.image));
        res.redirect('/admin/products');
    }

};
module.exports = {
    adminProducts, adminProductsJSON
};