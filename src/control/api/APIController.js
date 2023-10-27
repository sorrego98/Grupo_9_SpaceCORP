const db = require('../../database/models');
require('dotenv').config();

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
                        db.Products.findAll({ include: [{ association: 'subcategories' }]})
                            .then(products => {
                                let data = products.map ( product => {
                                    return {
                                        id: product.id,
                                        name: product.name,
                                        subcategory: {
                                            id: product.subcategories.id,
                                            name: product.subcategories.name
                                            },
                                        detail: 'http://localhost:' + PORT + '/api/products/' + product.id
                                    }
                                })
                                let countBySubCat = subCat.map( subCat =>  {
                                    let prods = data.filter(product => product.subcategory.id == subCat.id)     
                                    let nameSubCat = subCat.name
                                    let keyValue = "{ \"" + nameSubCat + "\" : " + prods.length + "}"
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
                db.SubCategory.findAll({ include: [{ association: 'categories' }] })                
                    .then(subCat => {
                        let data = subCat.map ( subCat => {
                            return {
                                id: subCat.id,
                                name: subCat.name,
                                category: {
                                    id: subCat.categories.id,
                                    name: subCat.categories.name,
                                },
                                detail: 'http://localhost:' + PORT + '/api/subcategory/' + subCat.id
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
                                email: user.email,
                                detail: 'http://localhost:' + PORT + '/api/users/' + user.id
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
                            name: member.songTitle,
                            detail: 'http://localhost:' + PORT + '/api/members/' + member.id
                        }
                    })
                    
                    return res.status(200).json({
                        total: data.length,
                        data,
                    })
                })     
                .catch(error => res.status(400).send("Error presente: " + error));
            break;

            case 'GALERY':
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
        let method = req.params.method
        let idConsult = idConsult
        switch (method.toUpperCase()) {

            case 'PRODUCTS':
                db.Products.findByPk(idConsult, { include: [{ association: 'categories' }, { association: 'subcategories' }, { association: 'productprices' }] })
                    .then(product => {
                        return res.status(200).json({
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
                                imageProduct: 'http://localhost:' + PORT + '/db-images/products/products/' + product.image
                            }
                        })
                    })
                    .catch(error => res.status(400).send("Error presente: " + error));
                ;
                break;

            case 'SUBCATEGORY':
                db.SubCategory.findByPk(idConsult, { include: [{ association: 'categories' }] })
                    .then(subCat => {
                        return res.status(200).json({
                            data: {
                                name: subCat.name,
                                description: subCat.description,
                                category: {
                                    id: subCat.categories.id,
                                    name: subCat.categories.name,
                                },
                                imageSubcategory: 'http://localhost:' + PORT + '/db-images/products/subcategories/' + subCat.image,
                            }
                        })
                    })
                    .catch(error => res.status(400).send("Error presente: " + error));
                ;
                break;

            case 'USERS':
                db.Users.findByPk(idConsult)
                    .then(user => {
                        return res.status(200).json({
                            data: {
                                name: user.firstName,
                                lastName: user.lastName,
                                userName: user.userName,
                                email: user.email,
                                imageProfile: 'http://localhost:' + PORT + '/db-images/users/' + user.imageProfile,
                            }
                        })
                    })
                    .catch(error => res.status(400).send("Error presente: " + error));
                ;
                break;

            case 'PRODUCTIONS':
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
                ;
                break;

                case 'MEMBERS':
                db.Member.findByPk(idConsult)
                    .then(member => {
                        return res.status(200).json({
                            data: {
                                name: member.name,
                                jobTitle: member.jobName,
                                instagramName: member.instagramName,
                                instagramUrl: member.instagramUrl,
                                imageProfile: 'http://localhost:' + PORT + '/db-images/home/members/' + member.image,
                            }
                        })
                    })
                    .catch(error => res.status(400).send("Error presente: " + error));
                ;
                break;

            default:
                res.send("La API que intenta consulta, no existe");

        }
    }
};

module.exports = {controlAPI}