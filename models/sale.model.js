module.exports = (sequelize, DataTypes) => { 
    const Sale = sequelize.define('Sale', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
    });
    return Sale;
}