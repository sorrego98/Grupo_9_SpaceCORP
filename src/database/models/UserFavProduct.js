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

    return UserFavs;
    
};