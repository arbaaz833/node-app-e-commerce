const fs = require("fs").promises;
const path = require("path");

const NUM_PRODUCTS = 1000;
const NUM_ORDERS = 500;

// --- Helper Data ---
const productCategories = [
  "Electronics",
  "Home & Kitchen",
  "Books",
  "Sports & Outdoors",
  "Accessories",
  "Office Supplies",
  "Beauty & Personal Care",
  "Toys & Games",
  "Automotive",
  "Groceries",
  "Health",
];
const productAdjectives = [
  "Premium",
  "Wireless",
  "Eco-friendly",
  "Smart",
  "Compact",
  "Heavy Duty",
  "Lightweight",
  "Ergonomic",
  "Vintage",
  "Modern",
  "Rustic",
  "Sleek",
  "Durable",
  "Portable",
  "Handmade",
];
const productNouns = [
  "Headphones",
  "Laptop",
  "Mouse",
  "Keyboard",
  "Bottle",
  "Backpack",
  "Charger",
  "Watch",
  "Speaker",
  "Novel",
  "Desk Lamp",
  "Coffee Maker",
  "Blender",
  "Yoga Mat",
  "Sneakers",
  "Smartphone",
  "Tablet",
  "Drone",
];
// "" for no suffix

// --- Helper Functions ---
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max, decimals = 2) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
}

function generateRandomDate(startDate, endDate) {
  return new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );
}

// --- Generate Products ---
async function generateProducts() {
  const products = [];
  for (let i = 0; i < NUM_PRODUCTS; i++) {
    const category = getRandomElement(productCategories);
    const adj = getRandomElement(productAdjectives);
    const noun = getRandomElement(productNouns);
    // const suffix = getRandomElement(productSuffixes);
    const name = `${adj} ${noun}`.replace(/\s+/g, " ").trim(); // Ensure single spaces and trim

    products.push({
      id: `p${i + 1}`, // p1, p2, ...
      name: name,
      category: category,
      description: `A high-quality ${name}. Perfect for daily use and offers great value. Explore the best features of the ${category.toLowerCase()} world.`,
      price: getRandomFloat(5.0, 1000.0),
      stock: getRandomInt(0, 300), // Some products can have 0 stock
      imageUrl: `images/placeholder_${category
        .toLowerCase()
        .replace(/ & /g, "_")
        .replace(/ /g, "_")}.jpg`, // e.g., images/placeholder_home_kitchen.jpg
    });
  }
  return products;
}

// --- Generate Orders ---
async function generateOrders(products) {
  const orders = [];
  const startDate = new Date(2022, 0, 1); // Approx 2.5 years ago from May 2024
  const endDate = new Date(); // Today

  for (let i = 0; i < NUM_ORDERS; i++) {
    const product = getRandomElement(products); // Get a random product
    const quantity = getRandomInt(1, 5);
    const orderDate = generateRandomDate(startDate, endDate);
    const status = "Completed";

    // Ensure totalPrice is consistent, especially if price has few decimal places
    const totalPrice = parseFloat((product.price * quantity).toFixed(2));

    orders.push({
      orderId: `o${i + 1}`, // o1, o2, ...
      productId: product.id,
      // Optional: include category here if you don't want to join later, but your backend already does
      // category: product.category,
      quantity: quantity,
      totalPrice: totalPrice,
      orderDate: orderDate.toISOString(), // ISO format is good for date handling
      status: status,
    });
  }
  return orders;
}

// --- Main Generation and Writing ---
async function main() {
  try {
    console.log("Generating products...");
    const products = await generateProducts();
    const productsFilePath = path.join(__dirname, "data", "products.json");
    await fs.mkdir(path.dirname(productsFilePath), { recursive: true }); // Ensure 'data' directory exists
    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
    console.log(
      `Successfully generated ${NUM_PRODUCTS} products at ${productsFilePath}`
    );

    console.log("Generating orders...");
    const orders = await generateOrders(products); // Pass products to ensure valid product IDs and prices
    const ordersFilePath = path.join(__dirname, "data", "orders.json");
    await fs.mkdir(path.dirname(ordersFilePath), { recursive: true }); // Ensure 'data' directory exists
    await fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2));
    console.log(
      `Successfully generated ${NUM_ORDERS} orders at ${ordersFilePath}`
    );
  } catch (error) {
    console.error("Error generating data:", error);
  }
}

main();
