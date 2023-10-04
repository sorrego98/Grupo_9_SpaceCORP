module.exports = (sequelize, dataTypes) => {
    let alias = 'Production'; /*este alias, hace relación al modelo del associate*/
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        songTitle: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        artistName: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        youtubeUrl: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };
    let config = {
        tableName: "productions",
        timestamps: false,
        underscored: true
    }
    const Production = sequelize.define(alias, cols, config); 

    return Production;
};