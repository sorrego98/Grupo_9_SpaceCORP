module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductPrice';
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
        tableName: "product_prices",
        timestamps: false
    }
    const ProductPrice = sequelize.define(alias, cols, config); 

    //Aquí debes realizar lo necesario para crear las relaciones con el modelo (Movie)
    
    // Actor.associate = function(models){
        
    //     Actor.belongsToMany(models.Movie,{
    //         as:"peliculas",
    //         through:"actor_movie",
    //         foreignKey:"actor_id",
    //         otherKey:"movie_id",
    //         timestamps:false
    //     })
    // }
    return ProductPrice;
};