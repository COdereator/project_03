import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import Category from './models/Category.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

// Define categories
const categories = [
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000001'),
    name: "Men's Fashion",
    slug: 'mens-fashion',
    description: 'Clothing and accessories for men',
    image: 'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000002'),
    name: "Women's Fashion",
    slug: 'womens-fashion',
    description: 'Clothing and accessories for women',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000003'),
    name: 'Electronics',
    slug: 'electronics',
    description: 'Gadgets, devices and electronic accessories',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000004'),
    name: 'Home & Living',
    slug: 'home-living',
    description: 'Furniture, decor and home accessories',
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000005'),
    name: 'Sports & Fitness',
    slug: 'sports-fitness',
    description: 'Athletic clothing, equipment and accessories',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

// Define products based on the above categories
const products = [];

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Check if data already exists
    const categoryCount = await Category.countDocuments();
    const productCount = await Product.countDocuments();

    if (categoryCount > 0 && productCount > 0) {
      console.log('Database already contains data:');
      console.log(`- ${categoryCount} categories`);
      console.log(`- ${productCount} products`);
      console.log('Skipping database seeding to preserve existing data.');
      mongoose.connection.close();
      return;
    }

    // Only clear and seed if database is empty
    console.log('Database is empty. Starting seeding process...');

    // Seed categories if needed
    if (categoryCount === 0) {
      console.log('Seeding categories...');
      await Category.insertMany(categories);
    }
    
    // Seed products if needed
    if (productCount === 0) {
      console.log('Seeding products...');
      await Product.insertMany(products);
    }

    console.log('Database seeded successfully!');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
