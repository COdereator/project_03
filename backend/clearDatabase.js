import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import Category from './models/Category.js';
import readline from 'readline';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

// Create readline interface for user confirmation
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const clearDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Check current data counts
    const categoryCount = await Category.countDocuments();
    const productCount = await Product.countDocuments();

    console.log('Current database status:');
    console.log(`- ${categoryCount} categories`);
    console.log(`- ${productCount} products`);

    rl.question('WARNING: This will delete ALL products and categories. Are you sure? (yes/no): ', async (answer) => {
      if (answer.toLowerCase() === 'yes') {
        console.log('Clearing all data...');
        await Category.deleteMany({});
        await Product.deleteMany({});
        console.log('All data has been deleted.');
      } else {
        console.log('Operation cancelled. No data was deleted.');
      }
      
      mongoose.connection.close();
      rl.close();
    });
  } catch (error) {
    console.error('Error:', error);
    mongoose.connection.close();
    rl.close();
    process.exit(1);
  }
};

clearDatabase(); 