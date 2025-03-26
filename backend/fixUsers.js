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

    // Find all users
    const users = await User.find({});
    console.log(`Found ${users.length} users in database`);

    for (const user of users) {
      console.log(`Checking user: ${user.email}`);
      console.log('Current password hash:', user.password);
      
      // Check if password needs to be hashed (test for known test passwords)
      const testPasswords = ['password123', 'admin123', 'test123'];
      let passwordFixed = false;

      for (const testPassword of testPasswords) {
        try {
          const isMatch = await bcrypt.compare(testPassword, user.password);
          if (isMatch) {
            console.log(`Password match found for ${user.email}`);
            passwordFixed = true;
            break;
          }
        } catch (e) {
          // If bcrypt.compare fails, the password is likely not hashed
          console.log(`Password comparison failed for ${user.email}, might need rehashing`);
        }
      }

      if (!passwordFixed) {
        // If the password is not hashed or doesn't match test passwords, set it to a default
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);
        user.password = hashedPassword;
        await user.save();
        console.log(`Reset password for user ${user.email} to 'password123'`);
      }
    }

    // Create test users if they don't exist
    const testUsers = [
      { email: 'test@example.com', password: 'password123', username: 'testuser' },
      { email: 'admin@example.com', password: 'admin123', username: 'admin' }
    ];

    for (const testUser of testUsers) {
      const existingUser = await User.findOne({ email: testUser.email });
      
      // Always update the test@example.com user's password
      if (testUser.email === 'test@example.com') {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(testUser.password, salt);
        
        if (existingUser) {
          existingUser.password = hashedPassword;
          await existingUser.save();
          console.log(`Updated password for existing user: ${testUser.email}`);
        } else {
          const newUser = new User({
            ...testUser,
            password: hashedPassword
          });
          await newUser.save();
          console.log(`Created test user: ${testUser.email}`);
        }
      }
      // For other users, only create if they don't exist
      else if (!existingUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(testUser.password, salt);
        
        const newUser = new User({
          ...testUser,
          password: hashedPassword
        });
        
        await newUser.save();
        console.log(`Created test user: ${testUser.email}`);
      }
    }

    console.log('Database users verified and fixed!');
    console.log('Test users available:');
    console.log('Email: test@example.com, Password: password123');
    console.log('Email: admin@example.com, Password: admin123');

  } catch (error) {
    console.error('Error fixing users:', error);
  } finally {
    await mongoose.connection.close();
  }
}

fixUsers(); 