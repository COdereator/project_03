import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const fixUsers = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Check existing users
    const users = await User.find({});
    console.log(`Found ${users.length} users in database`);

    if (users.length === 0) {
      console.log('No users found, creating test users...');
      
      // First test user
      const testUserSalt = await bcrypt.genSalt(10);
      const testUserHash = await bcrypt.hash('password123', testUserSalt);
      await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: testUserHash
      });
      
      // Admin user
      const adminSalt = await bcrypt.genSalt(10);
      const adminHash = await bcrypt.hash('admin123', adminSalt);
      await User.create({
        username: 'admin',
        email: 'admin@example.com',
        password: adminHash
      });
      
      console.log('Created test users successfully');
    } else {
      // Recreate users with proper password hashing
      console.log('Updating existing users with properly hashed passwords...');
      
      for (const user of users) {
        // Check if password is already hashed (longer than 20 chars typically)
        if (user.password.length < 20) {
          console.log(`Updating user ${user.email} with properly hashed password`);
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(user.password, salt);
          
          user.password = hashedPassword;
          await user.save();
        } else {
          console.log(`User ${user.email} already has a hashed password`);
        }
      }
    }

    console.log('Database users verified and fixed!');
    console.log('Test users available:');
    console.log('Email: test@example.com, Password: password123');
    console.log('Email: admin@example.com, Password: admin123');
    
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error fixing users:', error);
    process.exit(1);
  }
};

fixUsers(); 