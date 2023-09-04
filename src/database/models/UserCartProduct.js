module.exports = (sequelize, dataTypes) => {
    let alias = 'UserCart';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        idUser: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        idProduct: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        Quantity: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tableName: "User_Cart_Products",
        timestamps: false,
        underscored: true
    }
    const UserCart = sequelize.define(alias, cols, config); 

    // Products.associate = function(models){
    //     Products.belongsTo(models.Category,{
    //         as:"category", /*revisa */
    //         foreignKey:"cat_id"
    //     })
    //     Products.belongsTo(models.PriceType,{
    //         as:"pricetype", /*revisa */
    //         foreignKey:"price_id"
    //     })
    //     Products.belongsTo(models.SubCategory,{
    //         as:"subcategory", /*revisa */
    //         foreignKey:"subcat_id"
    //     })
    // }

    return UserCart;
};