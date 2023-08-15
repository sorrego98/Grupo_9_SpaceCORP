const path = require("path");
const fs = require("fs");
let controlMain = require('./controlMain');
const { products } = require("./controlProducts");
const { users } = require("./controlUsers");

const adminProducts = {
    listProducts: (req, res) => {
        const products = controlMain.controlMethods.leerJSON('products.json');
        /*console.log(products)*/
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
            //id: (parseInt(lastProduct.id) +1).toString(),
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

const adminUsers = {
    listUsers: (req, res) => {
        const users = controlMain.controlMethods.leerJSON('users.json');
        /*console.log(users)*/
        res.render('./admin/users/list-users', { users })
    },
    addUser: (req, res) => {
        res.render('./admin/users/add-users')
    },
    saveUser: (req, res) => {
        const users = controlMain.controlMethods.leerJSON('users.json');
        const lastUser = users.pop();
        users.push(lastUser);
        const newUser = {
            //id: (parseInt(lastUser.id) +1).toString(),
            id: parseInt(lastUser.id) +1,
            first_name: req.body.name,
            last_name: req.body.description,
            user_name: req.body.user_name,
            password: req.body.password,
            email: req.body.email,
            image_profile: req.file.filename
        }
        users.push(newUser);

        let resUsers = JSON.stringify(users, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../data/users.json'), resUsers);
        res.redirect('/admin/users');
    },
    modUser: (req, res) => {
        const users = controlMain.controlMethods.leerJSON('users.json');
        const user = users.find(user =>
            parseInt(req.params.id) === user.id
        );
        res.render('./admin/users/modify-users', { user })
    },
    detailUser: (req, res) => {
        const users = controlMain.controlMethods.leerJSON('users.json');
        const user = users.find(user =>
            parseInt(req.params.id) === user.id
        );
        res.render('./admin/users/detail-users', { user })
    },
    alterUser: (req, res) => {
        const users = controlMain.controlMethods.leerJSON('users.json');
        let pic = "";
        let arrUsers = [];
        users.forEach(user => {
            if (user.id !== parseInt(req.params.id)) {
                arrUsers.push(user);
            } else {    
                console.log(user.image)
                if(req.file){
                    pic = req.file.filename
                    try {
                        fs.unlinkSync(path.resolve(__dirname, '../../public/db-images/users/', user.image));             
                      } catch (e) {                        
                      }

                }else{
                    pic = req.body.oldImage

                }
                arrUsers.push(
                    {
                        id: user.id,
                        first_name: req.body.name,
                        last_name: req.body.description,
                        user_name: req.body.user_name,
                        password: req.body.password,
                        email: req.body.email,
                        image_profile: req.file.filename
                    }
                );
            }
        });

        let resUsers = JSON.stringify(arrUsers, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../data/users.json'), resUsers);
        res.redirect('/admin/users');
        
    },
    deleteUser: (req, res) => {
        const users = controlMain.controlMethods.leerJSON('users.json');
        const id = parseInt(req.params.id);
        const deleteUser = users.find(user => user.id == id);
        const filteredUsers = users.filter(currentUser => currentuser.id !== id);
        let resUsers = JSON.stringify(filteredUsers, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../data/users.json'), resUsers);
        fs.unlinkSync(path.resolve(__dirname, '../../public/db-images/users/', deleteUser.image));
        res.redirect('/admin/users');
    }

};


module.exports = {
    adminProducts , adminUsers
};