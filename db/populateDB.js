const { sequelize, Product } = require('../models');

(async () => {
    try {
        await sequelize.sync();
        console.log('Database synchronized successfully.');

        const products = [
            { name: 'orange', price: 1.50, category: 'Fruits', stock_quantity: 50 },
            { name: 'apple', price: 1.20, category: 'Fruits', stock_quantity: 100 },
            { name: 'banana', price: 0.80, category: 'Fruits', stock_quantity: 75 },
            { name: 'carrot', price: 0.60, category: 'Vegetables', stock_quantity: 200 },
            { name: 'broccoli', price: 1.00, category: 'Vegetables', stock_quantity: 150 },
            { name: 'milk', price: 1.50, category: 'Dairy', stock_quantity: 120 },
            { name: 'yogurt', price: 0.90, category: 'Dairy', stock_quantity: 90 },
        ];

        await Product.bulkCreate(products);
        console.log('Products created successfully.');

    } catch (error) {
        console.error('Error populating the database:', error);
    } finally {
        await sequelize.close();
    }
}
)();