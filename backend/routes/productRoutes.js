import express from 'express';
import Product from '../models/Product.js';
import mongoose from 'mongoose';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let query;

    // If id is a number, find by numeric id
    if (/^\d+$/.test(id)) {
      // Convert numeric id to corresponding ObjectId
      const paddedId = id.padStart(24, '0');
      query = { _id: paddedId };
    } else {
      // If id is already in ObjectId format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product ID format' });
      }
      query = { _id: id };
    }

    const product = await Product.findOne(query).populate('category');
    console.log('Query:', query);
    console.log('Found product:', product);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create product (admin only)
router.post('/', async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: error.message });
  }
});

export default router;
