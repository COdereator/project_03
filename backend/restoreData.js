import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import Product from './models/Product.js';
import Category from './models/Category.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

// Create readline interface for user interaction
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const restoreData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    const backupDir = path.join(process.cwd(), 'backup');
    
    // Check if backup directory exists
    if (!fs.existsSync(backupDir)) {
      console.error('Backup directory not found. Run backupData.js first.');
      mongoose.connection.close();
      rl.close();
      return;
    }

    // List backup files
    const files = fs.readdirSync(backupDir);
    const categoryFiles = files.filter(file => file.startsWith('categories-'));
    const productFiles = files.filter(file => file.startsWith('products-'));

    if (categoryFiles.length === 0 || productFiles.length === 0) {
      console.error('No backup files found. Run backupData.js first.');
      mongoose.connection.close();
      rl.close();
      return;
    }

    // Sort files by date (newest first)
    categoryFiles.sort().reverse();
    productFiles.sort().reverse();

    console.log('Available category backups:');
    categoryFiles.forEach((file, index) => {
      console.log(`${index + 1}. ${file}`);
    });

    rl.question('Which category backup do you want to restore? (number): ', async (categoryAnswer) => {
      const categoryIndex = parseInt(categoryAnswer) - 1;
      if (isNaN(categoryIndex) || categoryIndex < 0 || categoryIndex >= categoryFiles.length) {
        console.error('Invalid selection.');
        mongoose.connection.close();
        rl.close();
        return;
      }

      console.log('Available product backups:');
      productFiles.forEach((file, index) => {
        console.log(`${index + 1}. ${file}`);
      });

      rl.question('Which product backup do you want to restore? (number): ', async (productAnswer) => {
        const productIndex = parseInt(productAnswer) - 1;
        if (isNaN(productIndex) || productIndex < 0 || productIndex >= productFiles.length) {
          console.error('Invalid selection.');
          mongoose.connection.close();
          rl.close();
          return;
        }

        // Confirm restore
        rl.question('This will replace all existing categories and products. Continue? (yes/no): ', async (confirm) => {
          if (confirm.toLowerCase() !== 'yes') {
            console.log('Restore cancelled.');
            mongoose.connection.close();
            rl.close();
            return;
          }

          try {
            // Load backup files
            const categoriesData = JSON.parse(
              fs.readFileSync(path.join(backupDir, categoryFiles[categoryIndex]), 'utf8')
            );
            const productsData = JSON.parse(
              fs.readFileSync(path.join(backupDir, productFiles[productIndex]), 'utf8')
            );

            // Clear existing data
            await Category.deleteMany({});
            await Product.deleteMany({});

            // Restore data
            await Category.insertMany(categoriesData);
            await Product.insertMany(productsData);

            console.log(`Restored ${categoriesData.length} categories and ${productsData.length} products successfully!`);
          } catch (error) {
            console.error('Error during restore:', error);
          }

          mongoose.connection.close();
          rl.close();
        });
      });
    });
  } catch (error) {
    console.error('Error:', error);
    mongoose.connection.close();
    rl.close();
  }
};

restoreData(); 