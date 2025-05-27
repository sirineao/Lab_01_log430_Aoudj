module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true
        },
        stock_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Product;
};