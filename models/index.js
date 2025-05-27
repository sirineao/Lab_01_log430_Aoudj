const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize('shop_db', 'sirine', 'hello1234', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

const Product = require('./product.model')(sequelize, DataTypes);
const Sale = require('./sale.model')(sequelize, DataTypes);

// Correct join table name
Sale.belongsToMany(Product, { through: 'sale_products' });
Product.belongsToMany(Sale, { through: 'sale_products' });

// Export for other scripts
module.exports = {
  sequelize,
  Product,
  Sale
};

// Run the sync immediately if called directly
if (require.main === module) {
  (async () => {
    await sequelize.sync({ alter: true });
    console.log("Tables created or updated successfully!");
    await sequelize.close();
  })();
}
