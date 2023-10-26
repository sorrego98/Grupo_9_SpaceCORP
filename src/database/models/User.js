module.exports = (sequelize, dataTypes) => {
    let alias = 'Users'; /*este alias, hace relación al modelo del associate*/
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        lastName: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        userName: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(1000),
            allowNull: false
        },
        imageProfile: {
            type: dataTypes.STRING(1000),
            allowNull: true
        },
        roleId: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
    };
    let config = {
        tableName: "Users",
        timestamps: false,
        underscored: true
    }
    const User = sequelize.define(alias, cols, config);

    User.associate = function(models){
        User.belongsTo(models.Roles,{
            as:"roles",
            foreignKey:"role_id"
        }) 
    }

   
    //     User.belongsToMany(models.Products,{
    //         as:"userscart",
    //         through:"user_cart_products",
    //         foreignKey:"id_user",
    //         otherKey:"id_product",
    //         timestamps:true})
            
    //     User.belongsToMany(models.Products,{
    //         as:"usersfav",
    //         through:"user_fav_products",
    //         foreignKey:"id_user",
    //         otherKey:"id_product",
    //         timestamps:true})
            
    //     User.belongsToMany(models.Products,{
    //         as:"userssale",
    //         through:"user_sales",
    //         foreignKey:"id_user",
    //         otherKey:"id_product",
    //         timestamps:true})
    // }

    return User;
};