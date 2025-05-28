const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize('shop_db', 'sirine', 'hello1234', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

const Product = require('./product.model')(sequelize, DataTypes);
const Sale = require('./sale.model')(sequelize, DataTypes);
const SaleProduct = require('./saleProduct')(sequelize, DataTypes);

Sale.belongsToMany(Product, { through: SaleProduct });
Product.belongsToMany(Sale, { through: SaleProduct });

module.exports = {
  sequelize,
  Product,
  Sale,
  SaleProduct
};

if (require.main === module) {
  (async () => {
    await sequelize.sync({ alter: true });
    console.log("Tables created successfully!");
    await sequelize.close();
  })();
}
