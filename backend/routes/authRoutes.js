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

    // Create new user - password will be hashed by the pre-save middleware
    const newUser = new User({
      username,
      email,
      password
    });

    const savedUser = await newUser.save();
    console.log('New user created:', { id: savedUser._id, email: savedUser.email });

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
    
    // Validate input
    if (!email || !password) {
      console.log('Missing credentials:', { email: !!email, password: !!password });
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Trim inputs
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    console.log('Login request received:', { 
      email: trimmedEmail,
      passwordProvided: true,
      passwordLength: trimmedPassword.length,
      passwordValue: trimmedPassword // temporary for debugging
    });

    // Find user
    const user = await User.findOne({ email: trimmedEmail });
    if (!user) {
      console.log('User not found:', trimmedEmail);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('User found:', { 
      id: user._id, 
      email: user.email,
      passwordHash: user.password,
      passwordHashLength: user.password.length
    });

    // Direct bcrypt comparison for debugging
    try {
      const directBcryptCompare = await bcrypt.compare(trimmedPassword, user.password);
      console.log('Direct bcrypt comparison result:', directBcryptCompare);
      
      // Use the User model's comparePassword method
      const modelCompareResult = await user.comparePassword(trimmedPassword);
      console.log('Model comparePassword result:', modelCompareResult);

      if (!directBcryptCompare && !modelCompareResult) {
        console.log('Password does not match using either method');
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // If we get here, at least one comparison method worked
      const token = jwt.sign(
        { userId: user._id }, 
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      console.log('Login successful, token generated for user:', user.email);

      // Send response
      res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    } catch (compareError) {
      console.error('Error comparing passwords:', compareError);
      return res.status(500).json({ message: 'Error verifying credentials' });
    }
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
