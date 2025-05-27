const readLine = require('readline');
const { sequelize, Product, Sale } = require('./models');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function shopMenu() {
    console.log("-------------------------------");
    console.log("Welcome to the Shop!");
    console.log("1. Search for a product");
    console.log("2. Register a sale");
    console.log("3. Cancel a sale");
    console.log("4. See products stock");
    console.log("5. Exit");
    console.log("-------------------------------");
    console.log(" ");

    rl.question("Enter your choice: ", async (choice) => {
        switch (choice) {
            case '1':
                await searchProduct();
                break;
            case '2':
                await registerSale();
                break;
            case '3':
                await cancelSale();
                break;
            case '4':
                await seeProductsStock();
                break;
            case '5':
                console.log("Thank you for visiting the shop!");
                rl.close();
                return;
            default:
                console.log("Invalid choice, please try again.");
        }
        //shopMenu(); // Show menu again after action
    });
}

async function searchProduct() {
    console.log("-------------------------------");
    console.log("Search for a product:");
    console.log("1. By id");
    console.log("2. By name");
    console.log("3. By category");
    console.log("4. Back to main menu");
    console.log("-------------------------------");
    console.log(" ");

    rl.question("Enter your choice: ", async (choice) => {
        switch (choice) {
            case '1':
                const id = parseInt(await askQuestion("Enter product ID: "));
                const product = await Product.findAll({ where: { id } });
                if (product.length > 0) {
                    console.log("Product found:");
                    product.forEach(p => {
                        console.log(`ID: ${p.id}, Name: ${p.name}, Price: ${p.price}, Stock: ${p.stock_quantity}`);
                    });
                } else {
                    console.log("No product found with that ID.");
                }
                console.log("Going back to the main menu...");
                await shopMenu();
                return;
            case '2':
                const name = await askQuestion("Enter product name: ");
                const product2 = await Product.findAll({ where: { name } });
                if (product2.length > 0) {
                    console.log("Product found:");
                    product2.forEach(p => {
                        console.log(`ID: ${p.id}, Name: ${p.name}, Price: ${p.price}, Stock: ${p.stock_quantity}`);
                    });
                } else {
                    console.log("No product found with that name.");
                }
                console.log("Going back to the main menu...");
                await shopMenu();
                return;
            case '3':
                const category = await askQuestion("Enter product category: ");
                const product3 = await Product.findAll({ where: { category } });
                if (product3.length > 0) {
                    console.log("Product found:");
                    product3.forEach(p => {
                        console.log(`ID: ${p.id}, Name: ${p.name}, Price: ${p.price}, Stock: ${p.stock_quantity}`);
                    });
                } else {
                    console.log("No product found with that category.");
                }
                console.log("Going back to the main menu...");
                await shopMenu();
                return;
            case '4':
                console.log("Returning to main menu.");
                await shopMenu();
                return;
            default:
                console.log("Invalid choice, returning to menu.");
                await shopMenu();
                return;
        }
    });
}

async function registerSale() {
    console.log("-------------------------------");
    console.log("Register a sale:");
    const productId = parseInt(await askQuestion("Enter product ID: "));
    const quantity = parseInt(await askQuestion("Enter quantity sold: "));

    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            console.log("Product not found.");
            return shopMenu();
        }

        if (product.stock_quantity < quantity) {
            console.log("Insufficient stock for this product.");
            return shopMenu();
        }

        const salePrice = product.price * quantity;
        await Sale.create({ price: salePrice });
        product.stock_quantity -= quantity;
        await product.save();

        console.log(`Sale registered successfully! Total price: $${salePrice.toFixed(2)}`);
    } catch (error) {
        console.error("Error registering sale:", error);
    }
    await shopMenu();
}

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}


shopMenu();
