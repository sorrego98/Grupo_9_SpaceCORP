module.exports = (sequelize, dataTypes) => {
    let alias = 'Member'; /*este alias, hace relación al modelo del associate*/
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
        jobName: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(1000),
            allowNull: false
        },
        instagramName: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        instagramUrl: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };
    let config = {
        tableName: "members",
        timestamps: false,
        underscored: true
    }
    const Member = sequelize.define(alias, cols, config); 

    return Member;
};