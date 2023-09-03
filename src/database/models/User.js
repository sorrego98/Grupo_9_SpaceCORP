/*hay que modificar el modelo ER para agregar los timestamps de creación y modificación de usuarios*/
module.exports = (sequelize, dataTypes) => {
    let alias = 'Users';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        lastName: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        userName: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(1000),
            allowNull: false
        },
        imageProfile: {
            type: dataTypes.STRING(1000),
            allowNull: true
        },
        roleId: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
    };
    let config = {
        timestamps: false,
        underscored: true
    }
    const Users = sequelize.define(alias, cols, config); 

    // Users.associate = function(models){
    //     Users.belongsTo(models.Role,{
    //         as:"roles", /*revisa */
    //         foreignKey:"role_id"
    //     })
    // }

    return Users;
};