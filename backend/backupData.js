import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Product from './models/Product.js';
import Category from './models/Category.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const backupData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Fetch all data
    const categories = await Category.find({});
    const products = await Product.find({});

    console.log(`Found ${categories.length} categories and ${products.length} products`);

    // Create backup directory if it doesn't exist
    const backupDir = path.join(process.cwd(), 'backup');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }

    // Create a timestamp for the backup files
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    // Save data to files
    fs.writeFileSync(
      path.join(backupDir, `categories-${timestamp}.json`),
      JSON.stringify(categories, null, 2)
    );

    fs.writeFileSync(
      path.join(backupDir, `products-${timestamp}.json`),
      JSON.stringify(products, null, 2)
    );

    console.log(`Backup created successfully in the 'backup' directory.`);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error backing up data:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

backupData(); 