module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
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
        timestamps: true,
        underscored: true
    }
    const Category = sequelize.define(alias, cols, config); 

    Category.associate = function(models){
        Category.hasMany(models.SubCategory,{
            as:"subcategories",
            foreignKey:"cat_id"
        })        
        
        Category.hasMany(models.Products,{
            as:"products", /*revisa */            
            foreignKey:"cat_id"
        })
    }
};