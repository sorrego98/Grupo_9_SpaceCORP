// let cat = require('./models/Category')
// let subCat = require('./models/SubCategory')
// let prod = require('./models/Product')
// let prodPrice = require('./models/ProductPrice')
// let role = require('./models/Role')
// let user = require('./models/User')
// let userFav = require('./models/UserFavProduct')
// let userCart = require('./models/UserCartProduct')
// let userSale = require('./models/UserSale')


// /* asociaciones para la tabla CATEGORIAS */
// cat.hasMany(subCat,{
//     as:'subcategories',
//     foreignKey:'cat_id'
// })

// // cat.belongsToMany(cat,{
// //     trough:'Products',
// //     foreignKey:'cat_id'
// // })

// subCat.belongsTo(cat,{
//     as:'subcategories',
//     foreignKey:'cat_id'
// })

// /* asociaciones para la tabla PRODUCTOS */

// prod.belongsToMany(cat,{
//     trough:'Products',
//     foreignKey:'cat_id'
// })


// /* asociaciones para USERS */
// user.belongsTo(models.Roles,{
//     as:"roles",
//     foreignKey:"role_id"
// })

// role.hasMany(models.Users,{
//     as:"users",
//     foreignKey:"role_id"
// })