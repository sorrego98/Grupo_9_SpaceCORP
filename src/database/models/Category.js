module.exports = (sequelize, dataTypes) => {
    let alias = 'Category'; /*este alias, hace relación al modelo del associate*/
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
        tableName: "categories",
        timestamps: false,
        underscored: true
    }
    const Category = sequelize.define(alias, cols, config); 

    Category.associate = function(models){
        Category.hasMany(models.SubCategory,{
            as:"subcategories",
            foreignKey:"cat_id"
        });

        Category.hasMany(models.Products,{
            as:"products",
            foreignKey:"cat_id"
        });
    }

    return Category;
};