import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

async function fixUsers() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Delete existing test user if it exists
    await User.deleteOne({ email: 'test@example.com' });
    console.log('Deleted existing test user if any');

    // Create new test user with plain password (will be hashed by pre-save middleware)
    const testUser = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

    // Save user (this will trigger the pre-save middleware to hash the password)
    await testUser.save();
    console.log('Created new test user:', {
      id: testUser._id,
      email: testUser.email,
      passwordHash: testUser.password
    });

    // Verify the password using the model's method
    const verifyResult = await testUser.comparePassword('password123');
    console.log('Password verification result:', verifyResult);

    // List all users for verification
    const allUsers = await User.find({});
    console.log('\nAll users in database:');
    for (const user of allUsers) {
      console.log(`User: ${user.email}, Hash: ${user.password}`);
      // Verify each user's password
      if (user.email === 'test@example.com') {
        const testResult = await user.comparePassword('password123');
        console.log(`Password verification for ${user.email}:`, testResult);
      }
    }

    console.log('\nTest user credentials:');
    console.log('Email: test@example.com');
    console.log('Password: password123');

  } catch (error) {
    console.error('Error fixing users:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

fixUsers(); 