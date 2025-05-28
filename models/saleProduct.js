module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return SaleProduct;
};
