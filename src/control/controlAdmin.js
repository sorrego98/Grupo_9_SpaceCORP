const path = require("path");
const fs = require("fs");
let controlMain = require('./controlMain');
const db = require('../database/models'); /*---> esto está tirando el proyecto*/

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
    addCategories: (req, res) => {
        res.render('./admin/products/add/add-categories')
    },
    saveCategories: (req, res) => {
        const categoryname = req.body.categoryname;
        db.Category.create({
            name: categoryname
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
        const pricename = req.body.pricename;
        db.ProductPrice.create({
            name: pricename
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
                res.render('./admin/products/add/add-subcategories', { allCategories })
            })
            .catch(error => res.send(error))
    },
    saveSubcategories: (req, res) => {
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
    addProducts: (req, res) => {
        const categories = db.Category.findAll({ include: { association: 'subcategories' } });
        const productPrices = db.ProductPrice.findAll();
        Promise.all([categories, productPrices])
            .then(([allCategories, allProductPrices]) => {
                res.render('./admin/products/add/add-Products', { allCategories, allProductPrices })
            })
            .catch(error => res.send(error))
    },
    saveProducts: (req, res) => {
        const productname = req.body.productname;
        const productdescription = req.body.productdescription;
        const category_id = req.body.category_id;
        const subcategory_id = req.body.subcategory_id;
        const price_id = req.body.price_id;
        const price = req.body.price;
        const statusProduct = req.body.statusProduct;
        const iamge = req.file.filename;
        db.Products.create({
            name: productname,
            description: productdescription,
            image,
            catId: category_id,
            subcatId: subcategory_id,
            priceId: price_id,
            price: price,
            status: statusProduct
        })
            .then(() => {
                res.redirect('/admin/products/products');
            })
            .catch(error => res.send(error))
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
    destroyCategories: async (req, res) => {
        const id = req.params.id;
        db.Category.destroy(
            { where: { id } }
        )
            .then(() => {
                return res.redirect('/admin/products/categories')
            })
    },
    destroyPrices: (req, res) => {
        const id = req.params.id;
        db.ProductPrice.destroy(
            { where: { id } }
        )
            .then(() => {
                return res.redirect('/admin/products/priceType')
            })
    },
    destroyProducts: (req, res) => { //HACER QUE ELIMINE LA IMAGE ALMACENADA
        const id = req.params.id;
        db.Products.destroy(
            { where: { id } }
        )
            .then(() => {
                return res.redirect('/admin/products/products')
            })
    },
    destroySubcategories: (req, res) => { //HACER QUE ELIMINE LA IMAGE ALMACENADA
        const id = req.params.id;
        db.SubCategory.destroy(
            { where: { id } }
        )
            .then(() => {
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
            id: parseInt(lastProduct.id) + 1,
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
                if (req.file) {
                    pic = req.file.filename
                    try {
                        fs.unlinkSync(path.resolve(__dirname, '../../public/db-images/products/', product.image));
                    } catch (e) {
                    }

                } else {
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