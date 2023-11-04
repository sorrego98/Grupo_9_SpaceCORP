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
        description: {
            type: dataTypes.STRING(500),
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
            allowNull: true
        },
        status: {
            type: dataTypes.BOOLEAN,
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
        Products.belongsTo(models.ProductPrice, {
            as: 'productprices',
            foreignKey: 'price_id'
        });
    
        Products.belongsTo(models.SubCategory, {
            as: 'subcategories',
            foreignKey: 'subcat_id'
        });
    }

    return Products;
};