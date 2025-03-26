import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  try {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
      console.log('Password not modified, skipping hashing');
      return next();
    }

    console.log('Hashing password for user:', this.email);
    
    // Generate a salt with cost factor 10
    const salt = await bcrypt.genSalt(10);
    console.log('Generated salt');
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(this.password, salt);
    console.log('Password hashed successfully');
    
    // Override the cleartext password with the hashed one
    this.password = hashedPassword;
    console.log('New password hash:', this.password);
    
    next();
  } catch (error) {
    console.error('Error in password hashing:', error);
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    console.log('Comparing passwords for user:', this.email);
    console.log('Stored hash:', this.password);
    console.log('Candidate password length:', candidatePassword.length);
    
    // Use bcrypt to compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log('Password comparison result:', isMatch);
    
    return isMatch;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error;
  }
};

const User = mongoose.model('User', userSchema);
export default User;
