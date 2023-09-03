module.exports = (sequelize, dataTypes) => {
    let alias = 'UserFavs';
    let cols = {
        idUser: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true
        },
        idProduct: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true
        }
    };
    let config = {
        tableName: "User_Fav_Products",
        timestamps: false,
        underscored: true
    }
    const UserFavs = sequelize.define(alias, cols, config); 

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

    return UserFavs;
};