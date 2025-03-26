import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import User from './models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

const products = [
  {
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    stock: 50,
    rating: 4.5,
    reviews: []
  },
  {
    name: "Smart Fitness Watch",
    description: "Track your health and fitness with this advanced smartwatch featuring heart rate monitoring and GPS",
    price: 149.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    stock: 75,
    rating: 4.3,
    reviews: []
  },
  {
    name: "Professional Camera Kit",
    description: "DSLR camera with 24MP sensor, 4K video recording, and multiple lens options",
    price: 899.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    stock: 25,
    rating: 4.8,
    reviews: []
  },
  {
    name: "Designer Leather Backpack",
    description: "Stylish and durable leather backpack perfect for daily use or travel",
    price: 129.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    stock: 60,
    rating: 4.4,
    reviews: []
  },
  {
    name: "Organic Green Tea Set",
    description: "Premium organic green tea collection with traditional ceramic teapot",
    price: 49.99,
    category: "Food & Beverages",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500",
    stock: 100,
    rating: 4.6,
    reviews: []
  },
  {
    name: "Smart Home Security System",
    description: "Complete home security system with cameras, sensors, and mobile app control",
    price: 299.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=500",
    stock: 40,
    rating: 4.7,
    reviews: []
  },
  {
    name: "Luxury Watch Collection",
    description: "Elegant automatic watch with genuine leather strap and sapphire crystal",
    price: 499.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500",
    stock: 30,
    rating: 4.9,
    reviews: []
  },
  {
    name: "Gaming Laptop Pro",
    description: "High-performance gaming laptop with RTX graphics and 144Hz display",
    price: 1499.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500",
    stock: 20,
    rating: 4.8,
    reviews: []
  },
  {
    name: "Artisan Coffee Maker",
    description: "Professional-grade coffee maker with built-in grinder and temperature control",
    price: 249.99,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1520970014086-2208d157c9e2?w=500",
    stock: 45,
    rating: 4.5,
    reviews: []
  },
  {
    name: "Wireless Earbuds Pro",
    description: "True wireless earbuds with active noise cancellation and wireless charging case",
    price: 159.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500",
    stock: 80,
    rating: 4.6,
    reviews: []
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing products and users');

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`Added ${insertedProducts.length} products to the database`);

    console.log('\nProducts added successfully:');
    insertedProducts.forEach(product => {
      console.log(`- ${product.name} ($${product.price})`);
    });

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seedDatabase(); 