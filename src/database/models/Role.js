module.exports = (sequelize, dataTypes) => {
    let alias = 'Roles'; /*este alias, hace relación al modelo del associate*/
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        roleName: { //actualicé nombre
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };
    let config = {
        tableName: "Roles",
        timestamps: false,
        underscored: true
    }
    const Role = sequelize.define(alias, cols, config); 

    Role.associate = function(models){
        Role.hasMany(models.Users,{
            as:"users",
            foreignKey:"role_id"
        })
    }

    return Role;
};