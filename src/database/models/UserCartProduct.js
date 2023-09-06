module.exports = (sequelize, dataTypes) => {
    let alias = 'UserCart';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        idUser: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        idProduct: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        Quantity: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tableName: "User_Cart_Products",
        timestamps: false,
        underscored: true
    }
    const UserCart = sequelize.define(alias, cols, config); 

    return UserCart;
};