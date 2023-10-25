const path = require("path");
const fs = require("fs");
const db = require('../../database/models');

const controlAPI = {
    listData: function (req, res) {
        let method = req.params.method

        switch (method.toUpperCase()) {
            case 'CATEGORY':
                db.Category.findAll()
                    .then(cat => {
                        let data = [];
                        for (let i = 0; i < cat.length; i++) {
                            data.push({
                                id: cat[i].id,
                                name: cat[i].name
                            })
                        }
                        return res.json({
                            total: data.length,
                            data: data,
                            status: 200
                        })
                    })
                    // .then(reqData => res.json({
                    //     total: reqData.length,
                    //     data: reqData,
                    //     status: 200
                    // }))
                    .catch(error => res.send("Error presente: " + error));
                ;
                break;

            case 'PRODUCTS':
                db.Products.findAll({ include: [{ association: 'categories' }, { association: 'subcategories' }, { association: 'productprices' }] })
                    .then(product => {
                        let data = [];
                        for (let i = 0; i < product.length; i++) {
                            data.push({
                                id: product[i].id,
                                name: product[i].name,
                                subcategory: product[i].subcategories.name,
                                detail: 'http://localhost:5050/api/products/' + product[i].id
                            })
                        }
                        return res.json({
                            total: data.length,
                            data: data,
                            status: 200
                        })
                    })
                    .catch(error => res.send("Error presente: " + error));
                ;
                break;

            case 'SUBCATEGORY':
                db.SubCategory.findAll({ include: [{ association: 'categories' }] })
                    .then(subCat => {
                        let data = [];
                        for (let i = 0; i < subCat.length; i++) {
                            data.push({
                                id: subCat[i].id,
                                name: subCat[i].name,
                                detail: 'http://localhost:5050/api/subcategory/' + subCat[i].id
                            })
                        }
                        return res.json({
                            total: data.length,
                            data: data,
                            status: 200
                        })
                    })
                    .catch(error => res.send("Error presente: " + error));
                ;
                break;

            case 'PRODUCTPRICE':
                db.ProductPrice.findAll()
                    .then(productPrice => {
                        let data = [];
                        for (let i = 0; i < productPrice.length; i++) {
                            data.push({
                                id: productPrice[i].id,
                                name: productPrice[i].name
                            })
                        }
                        return res.json({
                            total: data.length,
                            data: data,
                            status: 200
                        })
                    })
                    .catch(error => res.send("Error presente: " + error));
                ;
                break;

            // case 'ROLES':
            //     db.Roles.findAll()
            //         .then(reqData => res.send(reqData))
            //         .catch(error => res.send("Error presente: " + error));
            //     ;
            //     break;


            // case 'USERS':
            //     db.Users.findAll()
            //         .then(reqData => res.send(reqData))
            //         .catch(error => res.send("Error presente: " + error));
            //     ;
            //     break;

            // case 'USERCART':
            //     db.UserCart.findAll()
            //         .then(reqData => res.send(reqData))
            //         .catch(error => res.send("Error presente: " + error));
            //     ;
            //     break;

            // case 'USERFAVS':
            //     db.UserFavs.findAll()
            //         .then(reqData => res.send(reqData))
            //         .catch(error => res.send("Error presente: " + error));
            //     ;
            //     break;

            // case 'USERSALE':
            //     db.UserSale.findAll()
            //         .then(reqData => res.send(reqData))
            //         .catch(error => res.send("Error presente: " + error));
            //     ;
            //     break;

            default:
                res.send("La API que intenta consulta, no existe");

        }
    },
    detailData: (req, res) => {
        let method = req.params.method
        switch (method.toUpperCase()) {

            case 'PRODUCTS':
                db.Products.findByPk(req.params.id, { include: [{ association: 'categories' }, { association: 'subcategories' }, { association: 'productprices' }] })
                    .then(product => {
                        return res.json({
                            data: {
                                name: product.name,
                                description: product.description,
                                category: {
                                    id: product.categories.id,
                                    name: product.categories.name
                                },
                                price: product.price,
                                PriceType: {
                                    id: product.productprices.id,
                                    name: product.productprices.name
                                },
                                subcategory: {
                                    id: product.subcategories.id,
                                    name: product.subcategories.name
                                },
                                imageProduct: 'http://localhost:5050/db-images/products/products/' + product.image
                            },
                            status: 200
                        })
                    })
                    .catch(error => res.send("Error presente: " + error));
                ;
                break;

            case 'SUBCATEGORY':
                db.SubCategory.findByPk(req.params.id, { include: [{ association: 'categories' }] })
                    .then(subCat => {
                        return res.json({
                            data: {
                                name: subCat.name,
                                description: subCat.description,
                                category: subCat.categories.name,
                                imageSubcategory: 'http://localhost:5050/db-images/products/subcategories/' + subCat.image,
                            },
                            status: 200
                        })
                    })
                    .catch(error => res.send("Error presente: " + error));
                ;
                break;

            default:
                res.send("La API que intenta consulta, no existe");

        }
    }
};
module.exports = {
    controlAPI
};