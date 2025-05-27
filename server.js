const Sequelize = require('sequelize');
const sequelize = new Sequelize('shop_db', 'sirine', 'hello1234', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection to the database has been established successfully.');
}
).catch(err => {
    console.error('Unable to connect to the database:', err);
});