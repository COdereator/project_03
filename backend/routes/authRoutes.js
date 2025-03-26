import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    console.log('Register request received:', { username, email });

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();

    // Generate JWT
    const token = jwt.sign(
      { userId: savedUser._id }, 
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Send response
    res.status(201).json({
      token,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login request received:', { email });

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('User found:', { id: user._id, email: user.email });

    // Try both methods for password verification
    let isMatch = false;
    
    // Method 1: Using bcrypt directly
    try {
      isMatch = await bcrypt.compare(password, user.password);
      console.log('Password match using bcrypt.compare:', isMatch);
    } catch (compareError) {
      console.error('Error comparing password with bcrypt:', compareError);
    }
    
    // Method 2: Using the model method if Method 1 fails
    if (!isMatch && typeof user.comparePassword === 'function') {
      try {
        isMatch = await user.comparePassword(password);
        console.log('Password match using user.comparePassword:', isMatch);
      } catch (modelCompareError) {
        console.error('Error using user.comparePassword:', modelCompareError);
      }
    }

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    console.log('Login successful, token generated');

    // Send response
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get current user
router.get('/me', authenticateToken, (req, res) => {
  res.json({
    id: req.user._id,
    username: req.user.username,
    email: req.user.email
  });
});

export default router;
