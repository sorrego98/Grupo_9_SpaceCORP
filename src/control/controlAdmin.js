const path = require("path");
const fs = require("fs");
let controlMain = require('./controlMain');
// const { products } = require("./controlProducts");
// const { users } = require("./controlUser");
const db = require('../database/models'); /*---> esto está tirando el proyecto*/
const { name } = require("ejs");
const { log } = require("console");

const adminProducts = {
    generalAdmon: (req, res) => {
        res.render('./admin/general-admon');
    },
    listPrices: (req, res) => {
        db.ProductPrice.findAll()
        .then(prices => {
            res.render('./admin/products/list/list-prices', { prices })
        })
        .catch(error => res.send("Error presente: " + error));
    },
    listCategories: (req, res) => {
        db.Category.findAll()
        .then(categories => {
            res.render('./admin/products/list/list-categories', { categories })
        })
        .catch(error => res.send("Error presente: " + error));
    },
    listSubCategories: (req, res) => {
        db.SubCategory.findAll()
        .then(subcategories => {
            res.render('./admin/products/list/list-subcategories', { subcategories })
        })
        .catch(error => res.send("Error presente: " + error));
    },
    listProducts: (req, res) => {
        db.Products.findAll()
        .then(products => {
            res.render('./admin/products/list/list-products', { products })
        })
        .catch(error => res.send("Error presente: " + error));
    },
    detailSubCategories: (req, res) => {
        db.SubCategory.findByPk(req.params.id)
        .then( subcategory => {
            res.render('./admin/products/detail/detail-subcategory', { subcategory })
        })
        .catch(error => res.send("Error presente: " + error));
    },
    detailProducts: (req, res) => {
        db.Products.findByPk(req.params.id, {include: [{association: 'subcategories'}, {association: 'categories'}, {association: 'productprices'}]})
        .then( product => {
            res.render('./admin/products/detail/detail-product', { product })
        })
        .catch(error => res.send("Error presente: " + error));
    },
    modPrices: (req, res) => {
        db.ProductPrice.findByPk(req.params.id)
        .then( price => {
            res.render('./admin/products/modify/modify-price', { price })
        })
        .catch(error => res.send("Error presente: " + error));
    },
    alterPrices: (req, res) => {
        db.ProductPrice.update(
            {
                name: req.body.pricename
            },
            {where: {id: req.params.id}}
        )
        .then(() => {
           res.redirect('/admin/products/priceType')
        })
        .catch(error => res.send("Error presente: " + error));        
    },
    modCategories: (req, res) => {
        db.Category.findByPk(req.params.id)
        .then( category => {
            res.render('./admin/products/modify/modify-category', { category })
        })
        .catch(error => res.send("Error presente: " + error));
    },
    alterCategories: (req, res) => {
        db.Category.update(
            {
                name: req.body.categoryname
            },
            {where: {id: req.params.id}}
        )
        .then(() => {
           res.redirect('/admin/products/categories')
        })
        .catch(error => res.send("Error presente: " + error));        
    },
    modSubCategories: (req, res) => { //Falta eliminar imagenes DB
        const categories = db.Category.findAll();
        const subcategories = db.SubCategory.findByPk(req.params.id, {include: [{association: 'categories'}]});
        Promise.all([subcategories, categories])
        .then(([allSubcategories, allCategories]) => {
            res.render('./admin/products/modify/modify-subcategory', {allSubcategories, allCategories})
        })
        .catch(error => res.send(error))
    },
    alterSubCategories: (req, res) => {
        db.SubCategory.update(
            {
                name: req.body.subcategoryname,
                description: req.body.subcategorydescription,
                image: req.file.filename,
                catId: req.body.category_id
            },
            {where: {id: req.params.id}}
        )
        .then(() => {
           res.redirect('/admin/products/subcategories')
        })
        .catch(error => res.send("Error presente: " + error));  
    },
    //FALTA MODIFICACIÓN PRODUCTOS
    addCategories: (req, res) => {
        res.render('./admin/products/add/add-categories')
    },
    saveCategories: (req, res) => {
        db.Category.create({
            name: req.body.categoryname
        })
        .then(() => {
            res.redirect('/admin/products/categories');
        })
        .catch(error => res.send(error))
    },
    addPrices: (req, res) => {
        res.render('./admin/products/add/add-prices')
    },
    savePrices: (req, res) => {
        db.ProductPrice.create({
            name: req.body.pricename
        })
        .then(() => {
            res.redirect('/admin/products/priceType');
        })
        .catch(error => res.send(error))
    },
    addSubcategories: (req, res) => {
        const categories = db.Category.findAll();
        Promise.all([categories])
        .then(([allCategories]) => {
            res.render('./admin/products/add/add-subcategories', {allCategories})
        })
        .catch(error => res.send(error))
    },
    saveSubcategories: (req, res) => {
        db.SubCategory.create({
            name: req.body.subcategoryname,
            description: req.body.subcategoryname,
            image: req.file.filename,
            catId: req.body.category_id
        })
        .then(() => {
            res.redirect('/admin/products/subcategories');
        })
        .catch(error => res.send(error))
    },
    addProducts: (req, res) => { //ESTÁ INCOMPLETO
        const categories = db.Category.findAll({include: {association: 'subcategories'}});
        const productPrices = db.ProductPrice.findAll();
        Promise.all([categories, productPrices/*, subcategories*/])
        .then(([allCategories, allProductPrices/*, allSubcategories*/]) => {
            res.render('./admin/products/add/add-Products', {allCategories, allProductPrices/*, allSubcategories*/})
        })
        .catch(error => res.send(error))
    },
    saveProducts: (req, res) => {
        db.SubCategory.create({
            name: req.body.productname,
            image: req.file.filename,
            // catId: req.body.category_id,
            subcatId: req.body.subcategory_id,
            priceId: req.body.price_id,
            price: req.body.price,
            status: req.body.statusProduct
        })
        .then(() => {
            res.redirect('/admin/products/products');
        })
        .catch(error => res.send(error))
    },
    destroyCategories: async (req, res) => {
        db.Category.destroy(
            {where: {id: req.params.id}}
        )
        .then( () => {
            return res.redirect('/admin/products/categories')
        })
    },
    destroyPrices: (req, res) => {
        db.ProductPrice.destroy(
            {where: {id: req.params.id}}
        )
        .then( () => {
            return res.redirect('/admin/products/priceType')
        })
    },
    destroyProducts: (req, res) => { //HACER QUE ELIMINE LA IMAGE ALMACENADA
        db.Products.destroy(
            {where: {id: req.params.id}}
        )
        .then( () => {
            return res.redirect('/admin/products/products')
        })
    },
    destroySubcategories: (req, res) => { //HACER QUE ELIMINE LA IMAGE ALMACENADA
        db.SubCategory.destroy(
            {where: {id: req.params.id}}
        )
        .then( () => {
            return res.redirect('/admin/products/subcategories')
        })
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
    adminProducts /*,adminProductsJSON*/
};