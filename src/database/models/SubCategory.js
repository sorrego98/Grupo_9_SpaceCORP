module.exports = (sequelize, dataTypes) => {
    let alias = 'SubCategory';
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
        },
        catId: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        underscored: true
    }
    const SubCategory = sequelize.define(alias, cols, config); 

    SubCategory.associate = function(models){
        SubCategory.belongsTo(models.Category,{
            as:"categories",
            foreignKey:"cat_id"
        })
        
        SubCategory.hasMany(models.Products,{
            as:"products", /*revisa */            
            foreignKey:"subcat_id"
        })
    }
}
;