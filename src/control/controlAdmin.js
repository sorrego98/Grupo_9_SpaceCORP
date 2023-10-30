const path = require("path");
const fs = require("fs");
let controlMain = require('./controlMain');
const db = require('../database/models');

const adminProducts = {
    generalAdmon: (req, res) => {
        res.render('./auth/admin/adminView');
    },
    lists:{
        Categories: (req, res) => {
            db.Category.findAll()
            .then(categories => {
                res.render('./admin/products/list/list-categories', { categories })
            })
            .catch(error => res.send("Error presente: " + error));
        },
        SubCategories: (req, res) => {
            db.SubCategory.findAll()
            .then(subcategories => {
                res.render('./admin/products/list/list-subcategories', { subcategories })
            })
            .catch(error => res.send("Error presente: " + error));
        },
        Prices: (req, res) => {
            db.ProductPrice.findAll()
                .then(prices => {
                    res.render('./admin/products/list/list-prices', { prices })
                })
                .catch(error => res.send("Error presente: " + error));
        },       
        Products: (req, res) => {
            db.Products.findAll()
                .then(products => {
                    res.render('./admin/products/list/list-products', { products })
                })
                .catch(error => res.send("Error presente: " + error));
        },        
    },
    adds:{
        Categories: (req, res) => {
            res.render('./admin/products/add/add-categories')
        },
        Prices: (req, res) => {
            res.render('./admin/products/add/add-prices')
        },
        Subcategories: (req, res) => {
            const categories = db.Category.findAll();
            Promise.all([categories])
                .then(([allCategories]) => {
                    res.render('./admin/products/add/add-subcategories', { allCategories })
                })
                .catch(error => res.send(error))
        },
        Products: (req, res) => {
            const categories = db.Category.findAll({ include: { association: 'subcategories' } });
            const productPrices = db.ProductPrice.findAll();
            Promise.all([categories, productPrices])
                .then(([allCategories, allProductPrices]) => {
                    res.render('./admin/products/add/add-Products', { allCategories, allProductPrices })
                })
                .catch(error => res.send(error))
        },
    },
    saves:{
        Categories: (req, res) => {
            const categoryname = req.body.categoryname;
            db.Category.create({
                name: categoryname
            })
                .then(() => {
                    res.redirect('/admin/products/categories');
                })
                .catch(error => res.send(error))
        },
        Prices: (req, res) => {
            const pricename = req.body.pricename;
            db.ProductPrice.create({
                name: pricename
            })
                .then(() => {
                    res.redirect('/admin/products/priceType');
                })
                .catch(error => res.send(error))
        },
        Subcategories: (req, res) => {
            const subcategoryname = req.body.subcategoryname;
            const subcategorydescription = req.body.subcategorydescription;
            const category_id = req.body.category_id;
            const image = req.file.filename;
            db.SubCategory.create({
                name: subcategoryname,
                description: subcategorydescription,
                image,
                catId: category_id
            })
                .then(() => {
                    res.redirect('/admin/products/subcategories');
                })
                .catch(error => res.send(error))
        },
        Products: (req, res) => {
            const productname = req.body.productname;
            const productdescription = req.body.productdescription;
            const category_id = parseInt(req.body.category_id);
            const subcategory_id = parseInt(req.body.subcategory_id);
            const price_id = parseInt(req.body.price_id);
            const price = req.body.price_id === 4 ? null : parseInt(req.body.price);
            const image = req.file.filename;
            db.Products.create({
                name: productname,
                description: productdescription,
                image,
                catId: category_id,
                subcatId: subcategory_id,
                priceId: price_id,
                price: price,
                status: 1
            })  
                .then(() => {
                    res.redirect('/admin/products/products');
                })
                .catch(error => res.send(error))
        },
    },


    
    detailSubCategories: (req, res) => {
        const id = req.params.id;
        db.SubCategory.findByPk(id, {include: [{association: 'categories'}]})
            .then(subcategory => {
                res.render('./admin/products/detail/detail-subcategory', { subcategory })
            })
            .catch(error => res.send("Error presente: " + error));
    },
    detailProducts: (req, res) => {
        const id = req.params.id;
        db.Products.findByPk(id, { include: [{ association: 'subcategories' }, { association: 'categories' }, { association: 'productprices' }] })
            .then(product => {
                res.render('./admin/products/detail/detail-product', { product })
            })
            .catch(error => res.send("Error presente: " + error));
    },
    modPrices: (req, res) => {
        const id = req.params.id;
        db.ProductPrice.findByPk(id)
            .then(price => {
                res.render('./admin/products/modify/modify-price', { price })
            })
            .catch(error => res.send("Error presente: " + error));
    },
    alterPrices: (req, res) => {
        const id = req.params.id;
        const pricename = req.body.pricename;
        db.ProductPrice.update(
            {
                name: pricename
            },
            { where: { id } }
        )
            .then(() => {
                res.redirect('/admin/products/priceType')
            })
            .catch(error => res.send("Error presente: " + error));
    },
    modCategories: (req, res) => {
        const id = req.params.id;
        db.Category.findByPk(id)
            .then(category => {
                res.render('./admin/products/modify/modify-category', { category })
            })
            .catch(error => res.send("Error presente: " + error));
    },
    alterCategories: (req, res) => {
        const id = req.params.id;
        const categoryname = req.body.categoryname;
        db.Category.update(
            {
                name: categoryname
            },
            { where: { id } }
        )
            .then(() => {
                res.redirect('/admin/products/categories')
            })
            .catch(error => res.send("Error presente: " + error));
    },
    modSubCategories: (req, res) => { //Falta eliminar imagenes DB
        const id = req.params.id;
        const categories = db.Category.findAll();
        const subcategories = db.SubCategory.findByPk(id, { include: [{ association: 'categories' }] });
        Promise.all([subcategories, categories])
            .then(([allSubcategories, allCategories]) => {
                res.render('./admin/products/modify/modify-subcategory', { allSubcategories, allCategories })
            })
            .catch(error => res.send(error))
    },
    alterSubCategories: (req, res) => {
        const id = req.params.id;
        const subcategoryname = req.body.subcategoryname;
        const subcategorydescription = req.body.subcategorydescription;
        const category_id = req.body.category_id;
        const oldImage = req.body.oldImage;
        let lastImage;
        req.file ? lastImage = req.file.filename : lastImage = oldImage;
        db.SubCategory.update(
            {
                name: subcategoryname,
                description: subcategorydescription,
                image: lastImage,
                catId: category_id
            },
            { where: { id } }
        )
            .then(() => {
                res.redirect('/admin/products/subcategories')
            })
            .catch(error => res.send("Error presente: " + error));
    },
    modProducts: (req, res) => { //Falta eliminar imagenes DB
        const id = req.params.id;
        const categories = db.Category.findAll();
        const prices = db.ProductPrice.findAll();
        const subcategories = db.SubCategory.findAll();
        const products = db.Products.findByPk(id, { include: [{ association: 'categories' }, { association: 'subcategories' }, { association: 'productprices' }] });
        Promise.all([subcategories, categories, products, prices])
            .then(([allSubcategories, allCategories, allProducts, allPrices]) => {
                res.render('./admin/products/modify/modify-product', { allSubcategories, allCategories, allProducts, allPrices })
            })
            .catch(error => res.send(error))
    },
    alterProducts: (req, res) => {
        const id = req.params.id;
        const productname = req.body.productname;
        const productdescription = req.body.productdescription;
        const category_id = req.body.category_id;
        const subcategory_id = req.body.subcategory_id;
        const price_id = req.body.price_id;
        const price = req.body.price;
        const statusProduct = req.body.statusProduct;
        const oldImage = req.body.oldImage;
        let lastImage;
        req.file ? lastImage = req.file.filename : lastImage = oldImage;
        db.Products.update(
            {
                name: productname,
                description: productdescription,
                image: lastImage,
                catId: category_id,
                subcatId: subcategory_id,
                priceId: price_id,
                price: price,
                status: statusProduct
            },
            { where: { id } }
        )
            .then(() => {
                res.redirect('/admin/products/products')
            })
            .catch(error => res.send("Error presente: " + error));
    },

    destroys:{
        Categories: async (req, res) => {
            const id = req.params.id;
            db.Category.destroy(
                { where: { id } }
            )
                .then(() => {
                    return res.redirect('/admin/products/categories')
                })
                .catch( error =>{
                    return res.send({error})
                })
        },
        Prices: (req, res) => {
            const id = req.params.id;
            db.ProductPrice.destroy(
                { where: { id } }
            )
                .then(() => {
                    return res.redirect('/admin/products/priceType')
                })
        },
        Products: (req, res) => { //HACER QUE ELIMINE LA IMAGE ALMACENADA
            const id = req.params.id;
            db.Products.destroy(
                { where: { id } }
            )
                .then(() => {
                    return res.redirect('/admin/products/products')
                })
        },
        Subcategories: (req, res) => { //HACER QUE ELIMINE LA IMAGE ALMACENADA
            const id = req.params.id;
            db.SubCategory.destroy(
                { where: { id } }
            )
                .then(() => {
                    return res.redirect('/admin/products/subcategories')
                })
        }

    }
};

module.exports = {
    adminProducts
};