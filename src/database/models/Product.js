module.exports = (sequelize, dataTypes) => {
    let alias = 'Products';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        priceId: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(1000),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(30,2),
            allowNull: false
        },
        status: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        },
        catId: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        subcatId: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
    };
    let config = {
        timestamps: false,
        underscored: true
    }
    const Products = sequelize.define(alias, cols, config); 

    Products.associate = function(models){
        Products.belongsTo(models.Category,{
            as:"category", /*revisa */
            foreignKey:"cat_id"
        })
    }
    //     Products.belongsTo(models.ProductPrice,{
    //         as:"productprice", /*revisa */
    //         foreignKey:"price_id"
    //     })

    //     Products.belongsTo(models.SubCategory,{
    //         as:"subcategory", /*revisa */
    //         foreignKey:"subcat_id"
    //     })

    //     Products.belongsToMany(models.Users,{
    //         as:"productscart",
    //         through:"user_cart_products",
    //         foreignKey:"id_product",
    //         otherKey:"id_user",
    //         timestamps:true})

    //     Products.belongsToMany(models.Users,{
    //         as:"productsfav",
    //         through:"user_fav_products",
    //         foreignKey:"id_product",
    //         otherKey:"id_user",
    //         timestamps:true})

    //     Products.belongsToMany(models.Users,{
    //         as:"productssale",
    //         through:"user_sales",
    //         foreignKey:"id_product",
    //         otherKey:"id_user",
    //         timestamps:true})
    // }

    return Products;
};