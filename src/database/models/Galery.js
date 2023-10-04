module.exports = (sequelize, dataTypes) => {
    let alias = 'Galery'; /*este alias, hace relación al modelo del associate*/
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
        image: {
            type: dataTypes.STRING(1000),
            allowNull: false
        }
    };
    let config = {
        tableName: "galeries",
        timestamps: false,
        underscored: true
    }
    const Galery = sequelize.define(alias, cols, config); 

    return Galery;
};