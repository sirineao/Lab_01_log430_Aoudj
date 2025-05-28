const readLine = require('readline');
const { sequelize, Product, Sale } = require('./models');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function shopMenu() {
    console.log("\n-------------------------------");
    console.log("Shop Menu options:");
    console.log("1. Search for a product");
    console.log("2. Register a sale");
    console.log("3. Cancel a sale");
    console.log("4. See products stock");
    console.log("5. Exit");
    console.log("-------------------------------");

    rl.question("Enter your choice: ", async (choice) => {
        switch (choice) {
            case '1': {
                await searchProduct();
                break;
            }
            case '2': {
                await registerSale();
                break;
            }
            case '3': {
                await cancelSale();
                break;
            }
            case '4': {
                await seeProductsStock();
                break;
            }
            case '5': {
                console.log("Thank you for visiting the shop!");
                rl.close();
                return;
            }
            default: {
                console.log("Invalid choice, please try again.");
            }
        }
        shopMenu();
    });
}

async function searchProduct() {
    console.log("\n-------------------------------");
    console.log("Search for a product:");
    console.log("1. By id");
    console.log("2. By name");
    console.log("3. By category");
    console.log("4. Back to main menu");
    console.log("-------------------------------");

    rl.question("\nEnter your choice: ", async (choice) => {
        switch (choice) {
            case '1': {
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
                console.log("Going back to the main menu");
                await shopMenu();
                return;
            }
            case '2': {
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
                console.log("Going back to the main menu");
                await shopMenu();
                return;
            }
            case '3': {
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
                console.log("Going back to the main menu");
                await shopMenu();
                return;
            }
            case '4': {
                console.log("Returning to main menu.");
                await shopMenu();
                return;
            }
            default: {
                console.log("Invalid choice, returning to menu.");
                await shopMenu();
                return;
            } 
          }
    });
}

async function registerSale() {
  console.log("\n-------------------------------");
  console.log("Register a sale:");

  const products = await Product.findAll();
  console.log("\nAvailable Products ");
  products.forEach(p => {
    console.log(`ID: ${p.id} - ${p.name} - $${p.price} (${p.stock_quantity} in stock)`);
  });

  let totalSalePrice = 0;
  let saleProducts = []; 
  let addingProducts = true;

  while (addingProducts) {
    const productId = parseInt(await askQuestion("\nEnter product ID to add to sale or 0 to quit: "));
    if (productId === 0) {
      addingProducts = false;
      break;
    }
    const product = await Product.findByPk(productId);

    if (!product) {
      console.log("No product found with that ID.");
      continue;
    }

    const quantity = parseInt(await askQuestion("Enter the quantity of the product: "));

    if (product.stock_quantity < quantity) {
      console.log("Quantity exceeds stock. Please enter a valid quantity.");
      continue;
    }

    saleProducts.push({ product, quantity });
    totalSalePrice += product.price * quantity;

    console.log(`Added ${quantity} x ${product.name} to sale. Subtotal: $${(product.price * quantity).toFixed(2)}`);
  }

  if (saleProducts.length === 0) {
    console.log("No products were added. Cancelling sale.");
    return shopMenu();
  }

  console.log(totalSalePrice)

  const sale = await Sale.create({ price: totalSalePrice });

  for (const item of saleProducts) {
    await sale.addProduct(item.product, { through: { quantity: item.quantity } });
    item.product.stock_quantity -= item.quantity;
    await item.product.save();
  }

  console.log(`Sale registered. Total price: $${totalSalePrice.toFixed(2)}`);
  await shopMenu();
}

async function cancelSale() {
  console.log("\n-------------------------------");
  console.log("Cancel a sale:");

  const sales = await Sale.findAll({
    include: {
      model: Product,
      through: { attributes: ['quantity'] }
    }
  });

  if (sales.length === 0) {
    console.log("There are no sales to cancel.");
    return shopMenu();
  }

  console.log("\nList of Sales:");
  sales.forEach(sale => {
    console.log(`Sale ID: ${sale.id} - Total: $${sale.price}`);
    sale.Products.forEach(p => {
      console.log(`  - ${p.name} (Quantity: ${p.SaleProduct.quantity})`);
    });
  });

  const saleId = parseInt(await askQuestion("\nEnter Sale id to cancel: "));
  const saleToCancel = await Sale.findByPk(saleId, {
    include: {
      model: Product,
      through: { attributes: ['quantity'] }
    }
  });

  if (!saleToCancel) {
    console.log("No sale found with that id.");
    return shopMenu();
  }

  for (const product of saleToCancel.Products) {
    const quantity = product.SaleProduct.quantity;
    product.stock_quantity += quantity;
    await product.save();
  }

  await saleToCancel.destroy();
  console.log("Sale cancelled and stock updated.");
  console.log("Returning to main menu.");

  await shopMenu();
}

async function seeProductsStock() {
  console.log("\nStock of products:");
  const products = await Product.findAll();

  if (products.length === 0) {
    console.log("No products in the database.");
  } else {
    products.forEach(p => {
      console.log(`ID: ${p.id} - ${p.name} - $${p.price} - ${p.stock_quantity} in stock`);
    });
  }

  await shopMenu();
}

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

shopMenu();
