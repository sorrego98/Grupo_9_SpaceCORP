const path = require("path");
const fs = require("fs");
const db = require('../../database/models'); /*---> esto está tirando el proyecto*/

const controlAPI = {
    metodoPrueba: function(req,res) {
        let method = req.params.method
        
        switch( method.toUpperCase()){
            case 'CATEGORY':
                db.Category.findAll()   
                    .then( reqData => res.send(reqData))
                    .catch(error => res.send("Error presente: " + error));
                    ;
                break;

            case 'PRODUCTS':
                db.Products.findAll()   
                    .then( reqData => res.send(reqData))
                    .catch(error => res.send("Error presente: " + error));
                    ;
                break;

            case 'PRODUCTPRICE':
                db.ProductPrice.findAll()   
                    .then( reqData => res.send(reqData))
                    .catch(error => res.send("Error presente: " + error));
                    ;
                break;
                
            case 'ROLES':
                db.Roles.findAll()   
                    .then( reqData => res.send(reqData))
                    .catch(error => res.send("Error presente: " + error));
                    ;
                break;

            case 'SUBCATEGORY':
                db.SubCategory.findAll()   
                    .then( reqData => res.send(reqData))
                    .catch(error => res.send("Error presente: " + error));
                    ;
                break;

            case 'USERS':                
                db.Users.findAll()   
                    .then( reqData => res.send(reqData))
                    .catch(error => res.send("Error presente: " + error));
                    ;
                break;

            case 'USERCART':
                db.UserCart.findAll()   
                    .then( reqData => res.send(reqData))
                    .catch(error => res.send("Error presente: " + error));
                    ;
                break;

            case 'USERFAVS':
                db.UserFavs.findAll()   
                    .then( reqData => res.send(reqData))
                    .catch(error => res.send("Error presente: " + error));
                    ;
                break;

            case 'USERSALE':
                db.UserSale.findAll()   
                    .then( reqData => res.send(reqData))
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