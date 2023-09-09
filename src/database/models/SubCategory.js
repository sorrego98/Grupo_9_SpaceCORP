module.exports = (sequelize, dataTypes) => {
    let alias = 'SubCategory'; /*este alias, hace relación al modelo del associate*/
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
        catId: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tableName: "sub_categories",
        timestamps: false,
        underscored: true
    }
    const SubCategory = sequelize.define(alias, cols, config); 

    SubCategory.associate = function(models){
        SubCategory.belongsTo(models.Category,{
            as:"categories",
            foreignKey:"cat_id"
        })
    }

    return SubCategory;
}
;