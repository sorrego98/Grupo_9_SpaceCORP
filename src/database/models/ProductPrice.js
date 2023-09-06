module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductPrice';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };
    let config = {
        tableName: "product_prices",
        timestamps: false
    }
    const ProductPrice = sequelize.define(alias, cols, config); 
    
    ProductPrice.associate = function(models){
        ProductPrice.hasMany(models.Products,{
            as:"productprice", /*revisa */
            foreignKey:"price_id"
        })
    }
    
    return ProductPrice;
};