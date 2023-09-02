module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductPrice';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const ProductPrice = sequelize.define(alias, cols, config); 
    
    ProductPrice.associate = function(models){
        Products.hasMany(models.Products,{
            as:"products", /*revisa */            
            foreignKey:"price_id"
        })
    }
};