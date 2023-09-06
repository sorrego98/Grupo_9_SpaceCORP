module.exports = (sequelize, dataTypes) => {
    let alias = 'UserSale';
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
        },
        totalPrice: {
            type: dataTypes.DECIMAL(60,2).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tableName: "User_Sales",
        timestamps: false,
        underscored: true
    }
    const UserSale = sequelize.define(alias, cols, config); 

    return UserSale;
    
};