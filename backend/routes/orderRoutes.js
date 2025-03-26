import express from 'express';
import Order from '../models/Order.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import Product from '../models/Product.js';

const router = express.Router();

// Create new order
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    // Calculate total and verify stock
    let totalAmount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Not enough stock for ${product.name}. Available: ${product.stock}`
        });
      }
      totalAmount += product.price * item.quantity;

      // Update product stock
      product.stock -= item.quantity;
      await product.save();
    }

    const order = new Order({
      user: req.user._id,
      items: items.map(item => ({
        ...item,
        price: items.find(i => i.product === item.product).price
      })),
      shippingAddress,
      paymentMethod,
      totalAmount,
      paymentStatus: paymentMethod === 'cash_on_delivery' ? 'pending' : 'completed'
    });

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get user's orders
router.get('/my-orders', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get single order
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('items.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
