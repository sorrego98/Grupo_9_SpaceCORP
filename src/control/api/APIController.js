const db = require('../../database/models');
require('dotenv').config();
// const methods = ["CATEGORY","PRODUCTS","SUBCATEGORY", "PRODUCTPRICE", "ROLES", "USERS", "PRODUCTIONS", "MEMBERS", "GALLERY"]
// const sinonym = ["CATEGORIAS","PRODUCTOS","SUBCATS", "PRECIOS", "ROLES", "USUARIOS", "PRODUCCIONES", "STAFF", "GALERIA"]
const PORT = parseInt(process.env.PORT);

const controlAPI = {
    listData: function (req, res) {
        let method = req.params.method
        
        switch (method.toUpperCase()) {
            case 'CATEGORY':
                db.Category.findAll()
                .then(categories => {
                        let data = categories.map ( category => {
                            return {
                                id: category.id,
                                name: category.name,                                
                            }
                        })
                        return res.status(200).json({
                            total: data.length,
                            data,
                        })
                })
                .catch(error => res.status(400).send("Error presente: " + error));
                break;

            case 'PRODUCTS':
                db.SubCategory.findAll()
                    .then( subCat => {
                        db.Products.findAll({ include: [{ association: 'subcategories' }, { association: 'productprices' }] })                        
                            .then(products => {
                                let data = products.map ( product => {
                                    return {
                                        id: product.id,
                                        name: product.name,
                                        description: product.description,
                                        price: product.price,
                                        subcategory: {
                                            id: product.subcategories.id,
                                            name: product.subcategories.name
                                            },
                                        PriceType: {
                                            id: product.productprices.id,
                                            name: product.productprices.name
                                        },
                                        imageProduct: 'http://localhost:' + PORT + '/db-images/'+ method + '/'+ method + '/' + product.image
                                        // detail: 'http://localhost:' + PORT + '/api/'+ method + '/' + product.id,
                                    }
                                })
                                let countBySubCat = subCat.map( subCat =>  {
                                    let prods = data.filter(product => product.subcategory.id == subCat.id)     
                                    let nameSubCat = subCat.name
                                    let keyValue = "{ \"subCatName\" : \"" + nameSubCat + "\"," +
                                                    " \"countbySubCat\" : " + prods.length + "}"
                                    return JSON.parse(keyValue,2)
                                })
                                return res.status(200).json({
                                    total: data.length,
                                    countBySubCat,
                                    data,
                                })
                            })
                    })
                    .catch(error => res.status(400).send({error: "no existen subcategorias, por tanto, no existen productos"}));
                break;

            case 'SUBCATEGORY':
                db.SubCategory.findAll({ include: [{ association: 'category' }] })                
                    .then(subCat => {
                        let data = subCat.map ( subCat => {
                            return {
                                id: subCat.id,
                                name: subCat.name,
                                description: subCat.description,
                                imageSubcategory: 'http://localhost:' + PORT + '/db-images/products/subcategories/' + subCat.image,
                                category: {
                                    id: subCat.category.id,
                                    name: subCat.category.name,
                                },
                                // detail: 'http://localhost:' + PORT + '/api/'+ method + '/' + subCat.id,                    
                            }
                        })
                        
                        return res.status(200).json({
                            total: data.length,
                            data,
                        })
                    })                    
                    .catch(error => res.status(400).send("Error presente: " + error));
                ;
                break;

            case 'PRODUCTPRICE':
                db.ProductPrice.findAll()
                    .then(productPrice => {
                        let data = productPrice.map ( productPrice => {
                            return {
                                id: productPrice.id,
                                name: productPrice.name
                            }
                        })
                        
                        return res.status(200).json({
                            total: data.length,
                            data,
                        })
                    })                    
                    .catch(error => res.status(400).send("Error presente: " + error));
                break;

            case 'ROLES':
                db.Roles.findAll()
                    .then(roles => {
                        let data = roles.map ( Rol => {
                            return {
                                id: Rol.id,
                                name: Rol.roleName
                            }
                        })
                        
                        return res.status(200).json({
                            total: data.length,
                            data,
                        })
                    })      
                    .catch(error => res.status(400).send("Error presente: " + error));      
                break;

            case 'USERS':
                db.Users.findAll({ include: [{ association: 'roles' }] })
                    .then(users => {
                        let data = users.map ( user => {
                            return {
                                id: user.id,
                                name: user.firstName,
                                lastName: user.lastName,
                                userName: user.userName,
                                email: user.email,
                                imageProfile: 'http://localhost:' + PORT + '/db-images/'+ method + '/' + user.imageProfile
                                // detail: 'http://localhost:' + PORT + '/api/'+ method + '/' + user.id
                            }
                        })
                        
                        return res.status(200).json({
                            total: data.length,
                            data,
                        })
                    })     
                    .catch(error => res.status(400).send("Error presente: " + error));
                break;

            case 'PRODUCTIONS':
                db.Production.findAll()
                    .then(prods => {
                        let data = prods.map ( prod => {
                            return {
                                id: prod.id,
                                name: prod.songTitle,
                                url: prod.youtubeUrl,
                                detail: 'http://localhost:' + PORT + '/api/productions/' + prod.id
                            }
                        })
                        
                        return res.status(200).json({
                            total: data.length,
                            data,
                        })
                    })     
                    .catch(error => res.status(400).send("Error presente: " + error));
                break;
                
            case 'MEMBERS':
                db.Member.findAll()
                .then(members => {
                    let data = members.map ( member => {
                        return {
                            id: member.id,
                            name: member.name,
                            jobTitle: member.jobName,
                            instagramName: member.instagramName,
                            instagramUrl: member.instagramUrl,
                            imageProfile: 'http://localhost:' + PORT + '/db-images/home/'+ method + '/' + member.image
                            // detail: 'http://localhost:' + PORT + '/api/'+ method + '/' + member.id,
                        }
                    })
                    
                    return res.status(200).json({
                        total: data.length,
                        data,
                    })
                })     
                .catch(error => res.status(400).send("Error presente: " + error));
            break;

            case 'GALLERY':
                db.Galery.findAll()
                    .then(photos => {
                        let data = photos.map ( photo => {
                            return {
                                id: photo.id,
                                name: photo.name,
                                image: 'http://localhost:' + PORT + '/db-images/home/galery/' + photo.image
                            }
                        })
                        
                        return res.status(200).json({
                            total: data.length,
                            data,
                        })
                    })     
                    .catch(error => res.status(400).send("Error presente: " + error));
                break;

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
        let idConsult = req.params.id
        let method = req.params.method
        console.log(idConsult, method)
        switch (method.toUpperCase()) {

            case 'GALLERY':
            case 'GALERIA':
                if (idConsult.toUpperCase() == "ALL"){
                    db.Galery.findAll()
                        .then(Galery => {
                            return res.status(200).json({data: Galery})
                        })
                        .catch(error => res.status(400).send("Error presente: " + error));
                }else{
                    res.send("La API que intenta consulta, no existe");
                }
                break;
                
            case 'PRODUCTPRICE':
            case 'PRECIOS':
                if (idConsult.toUpperCase() == "ALL"){
                    db.ProductPrice.findAll()
                        .then(PriceType => {
                            return res.status(200).json({data: PriceType})
                        })
                        .catch(error => res.status(400).send("Error presente: " + error));
                }else{
                    res.send("La API que intenta consulta, no existe");
                }
                break;

            case 'ROLES':
                if (idConsult.toUpperCase() == "ALL"){
                    db.Roles.findAll()
                        .then(roles => {
                            return res.status(200).json({data: roles})
                        })
                        .catch(error => res.status(400).send("Error presente: " + error));
                }else{
                    res.send("La API que intenta consulta, no existe");
                }
                break;
                    
            case 'CATEGORY':
            case 'CATEGORIAS':
                if (idConsult.toUpperCase() == "ALL"){
                    db.Category.findAll()
                        .then(Categories => {
                            return res.status(200).json({data: Categories})
                        })
                        .catch(error => res.status(400).send("Error presente: " + error));
                }else{
                    res.send("La API que intenta consulta, no existe");
                }
                break;

            case 'PRODUCTS':
            case 'PRODUCTOS':
                if (idConsult.toUpperCase() == "ALL"){
                    db.Products.findAll({ include: [{ association: 'subcategories' }, { association: 'productprices' }] })
                        .then(Products => {
                            return res.status(200).json({data: Products})
                        })
                        .catch(error => res.status(400).send("Error presente: " + error));
                }else{
                    db.Products.findByPk(idConsult, { include: [{ association: 'subcategories' }, { association: 'productprices' }] })
                        .then(product => {
                            return res.status(200).json({
                                data: {
                                    name: product.name,
                                    description: product.description,
                                    price: product.price,
                                    PriceType: {
                                        id: product.productprices.id,
                                        name: product.productprices.name
                                    },
                                    subcategory: {
                                        id: product.subcategories.id,
                                        name: product.subcategories.name
                                    },
                                    imageProduct: 'http://localhost:' + PORT + '/db-images/'+ method + '/'+ method + '/' + product.image
                                }
                            })
                        })
                        .catch(error => res.status(400).send("Error presente: " + error));
                }
                break;

            case 'SUBCATEGORY':
            case 'SUBCATS':
                if (idConsult.toUpperCase() == "ALL"){
                    db.SubCategory.findAll({ include: [{ association: 'category' }] })
                        .then(subCat => {
                            return res.status(200).json({data: subCat})
                        })
                        .catch(error => res.status(400).send("Error presente: " + error));
                }else{
                    console.log(idConsult)
                    db.SubCategory.findByPk(idConsult, { include: [{ association: 'category' }] })                    
                        .then(subCat => {
                            console.log(subCat)
                            return res.status(200).json({
                                data: {
                                    name: subCat.name,
                                    description: subCat.description,
                                    category: {
                                        id: subCat.category.id,
                                        name: subCat.category.name,
                                    }
                                }
                            })
                        })
                        .catch(error => res.status(400).send("Error presente: " + error));
                }
                break;

            case 'USERS':
            case 'USUARIOS':
                if (idConsult.toUpperCase() == "ALL"){
                    db.Users.findAll({ include: [{ association: 'roles' }] })
                        .then(Users => {
                            return res.status(200).json({data: Users})
                        })
                        .catch(error => res.status(400).send("Error presente: " + error));
                }else{
                    db.Users.findByPk(idConsult)
                        .then(user => {
                            return res.status(200).json({
                                data: {
                                    name: user.firstName,
                                    lastName: user.lastName,
                                    userName: user.userName,
                                    email: user.email,
                                    imageProfile: 'http://localhost:' + PORT + '/db-images/'+ method + '/' + user.imageProfile,
                                }
                            })
                        })
                        .catch(error => res.status(400).send("Error presente: " + error));
                }
                break;

            case 'PRODUCTIONS':
            case 'PRODUCCIONES':
                if (idConsult.toUpperCase() == "ALL"){
                    db.Production.findAll()
                        .then(Productions => {
                            return res.status(200).json({data: Productions})
                        })
                        .catch(error => res.status(400).send("Error presente: " + error));
                }else{
                    db.Production.findByPk(idConsult)
                        .then(production => {
                            return res.status(200).json({
                                data: {
                                    name: production.songTitle,
                                    artist: production.artistName,
                                    url: production.youtubeUrl
                                }
                            })
                        })
                        .catch(error => res.status(400).send("Error presente: " + error));
                }
                break;

            case 'MEMBERS':
            case 'STAFF':
                if (idConsult.toUpperCase() == "ALL"){
                    db.Member.findAll()
                        .then(members => {
                            return res.status(200).json({data: members})
                        })
                        .catch(error => res.status(400).send("Error presente: " + error));
                }else{
                    db.Member.findByPk(idConsult)
                        .then(member => {
                            return res.status(200).json({
                                data: {
                                    name: member.name,
                                    jobTitle: member.jobName,
                                    instagramName: member.instagramName,
                                    instagramUrl: member.instagramUrl,
                                    imageProfile: 'http://localhost:' + PORT + '/db-images/home/'+ method + '/' + member.image,
                                }
                            })
                        })
                        .catch(error => res.status(400).send("Error presente: " + error));
                }
                break;

            default:
                res.send("La API que intenta consulta, no existe");

        }
    }
};

module.exports = {controlAPI}