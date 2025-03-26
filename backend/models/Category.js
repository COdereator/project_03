import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  productCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
