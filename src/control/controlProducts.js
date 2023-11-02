const path = require("path");
const controlMain = require('./controlMain');
const db = require('../database/models'); /*---> esto está tirando el proyecto*/

const controlProducts = {
    products: async (req, res) => {
        db.Category.findAll({
            include: [
            {
                model: db.SubCategory,
                as: 'subcategories',
                include: [
                {
                    model: db.Products,
                    as: 'products',
                    include: [
                    {
                        model: db.ProductPrice,
                        as: 'productprices',
                    },
                    ],
                },
                ],
            },
            ],
        })
            .then(products =>{                
                res.render('./products/products', { products })
            })
            .catch (error => res.status(500).json({ error: 'Error al obtener las categorías.' }))
    },
    detailProductsDBJSON: (req, res) => {
        db.SubCategory.findByPk(req.params.id, { include: [{ association: 'products' }] })//{include: [{association: 'subcategories'}]})
            .then(subcategory => res.json(subcategory))
            /*res.render('./products/products', { products })*/
            .catch(error => res.send("Error presente: " + error));
    },
    detailProducts: function (req, res) {
        const subcategories = db.SubCategory.findByPk(req.params.id, { include: [{ association: 'products' }] });//{include: [{association: 'subcategories'}]})
        const productPrices = db.ProductPrice.findAll();
        Promise.all([subcategories, productPrices])
            .then(([allSubcategories, allProductPrices]) => {
                res.render('./products/detail-products', { allSubcategories, allProductPrices })
            })
            .catch(error => res.send("Error presente: " + error));
    }
};

const controlProductsJSON = {
    products: (req, res) => {
        /*extraigo la lista de productos*/
        const products = controlMain.controlMethods.leerJSON('products.json');
        /*los envío al front con la vista*/

    },
};

module.exports = controlProducts;


/*
{include: [association: ]}
*/