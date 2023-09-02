module.exports = (sequelize, dataTypes) => {
    let alias = 'Roles';
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
    const Roles = sequelize.define(alias, cols, config); 
    
    Roles.associate = function(models){
        Roles.hasMany(models.User,{
            as:"users",
            foreignKey:"role_id"
        })
    }
};