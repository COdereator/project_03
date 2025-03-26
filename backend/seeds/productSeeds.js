import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

const seedProducts = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get all categories
    const mensFashion = await Category.findOne({ slug: 'mens-fashion' });
    const womensFashion = await Category.findOne({ slug: 'womens-fashion' });
    const electronics = await Category.findOne({ slug: 'electronics' });
    const homeLiving = await Category.findOne({ slug: 'home-living' });
    const sportsFitness = await Category.findOne({ slug: 'sports-fitness' });

    if (!mensFashion || !womensFashion || !electronics || !homeLiving || !sportsFitness) {
      console.error('Categories not found. Please run category seeds first.');
      process.exit(1);
    }

    // Delete existing products
    await Product.deleteMany({});

    // Create sample products
    const products = [
      {
        _id: new mongoose.Types.ObjectId('000000000000000000000001'),
        name: 'Classic White T-Shirt',
        price: 29.99,
        description: 'A comfortable and versatile white t-shirt made from 100% cotton. Perfect for everyday wear.',
        category: mensFashion._id,
        images: [
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['White', 'Black', 'Gray'],
        features: ['Premium cotton', 'Comfortable fit', 'Machine washable'],
        stock: 100,
      },
      {
        _id: new mongoose.Types.ObjectId('000000000000000000000002'),
        name: 'Slim Fit Jeans',
        price: 59.99,
        description: 'Modern slim fit jeans with a perfect stretch for maximum comfort.',
        category: womensFashion._id,
        images: [
          'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        ],
        sizes: ['28', '30', '32', '34', '36'],
        colors: ['Blue', 'Black', 'Gray'],
        features: ['Stretch denim', 'Slim fit', 'High-quality stitching'],
        stock: 50,
      },
      {
        _id: new mongoose.Types.ObjectId('000000000000000000000003'),
        name: 'Wireless Headphones',
        price: 129.99,
        description: 'Premium wireless headphones with noise cancellation.',
        category: electronics._id,
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        ],
        sizes: ['One Size'],
        colors: ['Black', 'White', 'Rose Gold'],
        features: ['Noise cancellation', '30-hour battery', 'Bluetooth 5.0'],
        stock: 75,
      },
      {
        _id: new mongoose.Types.ObjectId('000000000000000000000004'),
        name: 'Modern Coffee Table',
        price: 199.99,
        description: 'Elegant coffee table with modern design.',
        category: homeLiving._id,
        images: [
          'https://images.unsplash.com/photo-1532372320978-9d4e23ae3a3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        ],
        sizes: ['Standard'],
        colors: ['Walnut', 'Oak', 'White'],
        features: ['Solid wood', 'Storage shelf', 'Easy assembly'],
        stock: 25,
      },
      {
        _id: new mongoose.Types.ObjectId('000000000000000000000005'),
        name: 'Premium Yoga Mat',
        price: 39.99,
        description: 'Professional yoga mat with excellent grip and cushioning.',
        category: sportsFitness._id,
        images: [
          'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        ],
        sizes: ['Standard'],
        colors: ['Purple', 'Blue', 'Green'],
        features: ['Non-slip surface', 'Eco-friendly', '6mm thickness'],
        stock: 60,
      },
      {
        _id: new mongoose.Types.ObjectId('000000000000000000000006'),
        name: 'Leather Jacket',
        price: 199.99,
        description: 'Classic leather jacket with modern styling.',
        category: mensFashion._id,
        images: [
          'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Brown'],
        features: ['Genuine leather', 'Quilted lining', 'Multiple pockets'],
        stock: 30,
      },
      {
        _id: new mongoose.Types.ObjectId('000000000000000000000007'),
        name: 'Smart Watch',
        price: 249.99,
        description: 'Feature-rich smartwatch with health tracking.',
        category: electronics._id,
        images: [
          'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        ],
        sizes: ['One Size'],
        colors: ['Black', 'Silver', 'Gold'],
        features: ['Heart rate monitor', 'GPS tracking', 'Water resistant'],
        stock: 45,
      },
      {
        _id: new mongoose.Types.ObjectId('000000000000000000000008'),
        name: 'Summer Dress',
        price: 79.99,
        description: 'Elegant summer dress with floral pattern.',
        category: womensFashion._id,
        images: [
          'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        ],
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Floral Print', 'Blue', 'Pink'],
        features: ['Lightweight fabric', 'Adjustable straps', 'Side pockets'],
        stock: 40,
      },
      {
        _id: new mongoose.Types.ObjectId('000000000000000000000009'),
        name: 'Running Shoes',
        price: 89.99,
        description: 'Professional running shoes with superior comfort.',
        category: sportsFitness._id,
        images: [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        ],
        sizes: ['7', '8', '9', '10', '11'],
        colors: ['Blue/White', 'Black/Red', 'Gray/Yellow'],
        features: ['Breathable mesh', 'Cushioned sole', 'Arch support'],
        stock: 55,
      },
      {
        _id: new mongoose.Types.ObjectId('000000000000000000000010'),
        name: 'Modern Desk Lamp',
        price: 49.99,
        description: 'Adjustable LED desk lamp with modern design.',
        category: homeLiving._id,
        images: [
          'https://images.unsplash.com/photo-1534073828943-f801091bb18e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        ],
        sizes: ['Standard'],
        colors: ['Black', 'White', 'Silver'],
        features: ['LED bulb included', 'Adjustable arm', 'Touch controls'],
        stock: 35,
      }
    ];

    await Product.insertMany(products);
    console.log('Products seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
