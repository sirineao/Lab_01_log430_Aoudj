const { sequelize } = require('../models');

(async () => {
  try {
    await sequelize.drop(); 
    console.log('Database cleared.');
    await sequelize.sync();
    console.log('Tables recreated.');
  } catch (err) {
    console.error('Error resetting database:', err);
  } finally {
    await sequelize.close();
  }
})();
