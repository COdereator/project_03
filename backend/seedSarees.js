import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import Category from './models/Category.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

// Saree categories
const sareeCategories = [
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000004'),
    name: "Silk Sarees",
    slug: 'silk-sarees',
    description: 'Luxurious silk sarees for special occasions',
    image: 'https://images.unsplash.com/photo-1599644498211-e226161e6585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000005'),
    name: "Banarasi Sarees",
    slug: 'banarasi-sarees',
    description: 'Traditional Banarasi silk sarees with gold work',
    image: 'https://images.unsplash.com/photo-1599644498211-e226161e6585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000006'),
    name: "Kanchipuram Sarees",
    slug: 'kanchipuram-sarees',
    description: 'Famous South Indian silk sarees with vibrant colors',
    image: 'https://images.unsplash.com/photo-1599644498211-e226161e6585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000007'),
    name: "Chanderi Sarees",
    slug: 'chanderi-sarees',
    description: 'Lightweight chanderi silk sarees with elegant designs',
    image: 'https://images.unsplash.com/photo-1599644498211-e226161e6585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000008'),
    name: "Patola Sarees",
    slug: 'patola-sarees',
    description: 'Vibrant double ikat patola silk sarees from Gujarat',
    image: 'https://images.unsplash.com/photo-1599644498211-e226161e6585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000009'),
    name: "Mysore Silk Sarees",
    slug: 'mysore-silk-sarees',
    description: 'Classic Mysore silk sarees with golden borders',
    image: 'https://images.unsplash.com/photo-1599644498211-e226161e6585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000010'),
    name: "Georgette Sarees",
    slug: 'georgette-sarees',
    description: 'Stylish georgette sarees for modern occasions',
    image: 'https://images.unsplash.com/photo-1599644498211-e226161e6585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000011'),
    name: "Kalamkari Sarees",
    slug: 'kalamkari-sarees',
    description: 'Hand-painted kalamkari designs on silk sarees',
    image: 'https://images.unsplash.com/photo-1599644498211-e226161e6585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000012'),
    name: "Art Silk Sarees",
    slug: 'art-silk-sarees',
    description: 'Contemporary art-inspired designs on silk sarees',
    image: 'https://images.unsplash.com/photo-1599644498211-e226161e6585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000013'),
    name: "Tussar Silk Sarees",
    slug: 'tussar-silk-sarees',
    description: 'Natural raw textured tussar silk sarees with hand block prints',
    image: 'https://images.unsplash.com/photo-1599644498211-e226161e6585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

// Saree products
const sareeProducts = [
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000105'),
    name: "Elegant Silk Saree",
    price: 89.99,
    description: "A luxurious silk saree with intricate designs, perfect for weddings and special occasions.",
    category: new mongoose.Types.ObjectId('000000000000000000000004'),
    images: [
      "https://ivalinmabia.com/cdn/shop/files/sita-dark-maroon-semi-silk-saree-sarees-375.webp?v=1725373038&width=3840",
      "https://thesareestory.in/wp-content/uploads/2020/10/A4C871D1-322F-4CFC-A415-3CECBA5C0C4D-scaled.jpeg"
    ],
    sizes: ["Free Size"],
    colors: ["Red", "Golden", "Blue"],
    features: ["100% Silk", "Handwoven", "Delicate embroidery"],
    stock: 50,
    createdAt: new Date("2023-01-24T12:31:30.123Z")
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000106'),
    name: "Royal Banarasi Silk Saree",
    price: 109.50,
    description: "Traditional Banarasi silk with zari work. Ideal for festive events and grand occasions.",
    category: new mongoose.Types.ObjectId('000000000000000000000005'),
    images: [
      "https://ivalinmabia.com/cdn/shop/files/sita-dark-maroon-semi-silk-saree-sarees-375.webp?v=1725373038&width=3840",
      "https://thesareestory.in/wp-content/uploads/2020/10/A4C871D1-322F-4CFC-A415-3CECBA5C0C4D-scaled.jpeg"
    ],
    sizes: ["Free Size"],
    colors: ["Pink", "Gold", "Green"],
    features: ["Pure Banarasi Silk", "Handwoven", "Zari Border"],
    stock: 40,
    createdAt: new Date("2023-01-24T12:31:30.123Z")
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000107'),
    name: "Graceful Kanchipuram Saree",
    price: 120.00,
    description: "Elegant Kanchipuram silk saree known for its vibrant color and contrast borders.",
    category: new mongoose.Types.ObjectId('000000000000000000000006'),
    images: [
      "https://ivalinmabia.com/cdn/shop/files/sita-dark-maroon-semi-silk-saree-sarees-375.webp?v=1725373038&width=3840",
      "https://thesareestory.in/wp-content/uploads/2020/10/A4C871D1-322F-4CFC-A415-3CECBA5C0C4D-scaled.jpeg"
    ],
    sizes: ["Free Size"],
    colors: ["Purple", "Gold"],
    features: ["Kanchipuram Silk", "Traditional Weave", "Contrast Border"],
    stock: 30,
    createdAt: new Date("2023-01-24T12:31:30.123Z")
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000108'),
    name: "Classic Chanderi Silk Saree",
    price: 95.00,
    description: "Lightweight chanderi silk saree with subtle prints and fine texture.",
    category: new mongoose.Types.ObjectId('000000000000000000000007'),
    images: [
      "https://ivalinmabia.com/cdn/shop/files/sita-dark-maroon-semi-silk-saree-sarees-375.webp?v=1725373038&width=3840",
      "https://thesareestory.in/wp-content/uploads/2020/10/A4C871D1-322F-4CFC-A415-3CECBA5C0C4D-scaled.jpeg"
    ],
    sizes: ["Free Size"],
    colors: ["Off-white", "Beige"],
    features: ["Chanderi Silk", "Lightweight", "Subtle Motifs"],
    stock: 45,
    createdAt: new Date("2023-01-24T12:31:30.123Z")
  },
  {
    _id: new mongoose.Types.ObjectId('000000000000000000000109'),
    name: "Rich Patola Silk Saree",
    price: 140.00,
    description: "Vibrant patola design in pure silk, featuring traditional patterns and bold colors.",
    category: new mongoose.Types.ObjectId('000000000000000000000008'),
    images: [
      "https://ivalinmabia.com/cdn/shop/files/sita-dark-maroon-semi-silk-saree-sarees-375.webp?v=1725373038&width=3840",
      "https://thesareestory.in/wp-content/uploads/2020/10/A4C871D1-322F-4CFC-A415-3CECBA5C0C4D-scaled.jpeg"
    ],
    sizes: ["Free Size"],
    colors: ["Red", "Black", "Green"],
    features: ["Patola Silk", "Double Ikat", "Vibrant Patterns"],
    stock: 25,
    createdAt: new Date("2023-01-24T12:31:30.123Z")
  },
  {
    _id: new mongoose.Types.ObjectId('00000000000000000000010A'),
    name: "Premium Mysore Silk Saree",
    price: 98.00,
    description: "Smooth Mysore silk saree with golden borders and rich pallu work.",
    category: new mongoose.Types.ObjectId('000000000000000000000009'),
    images: [
      "https://ivalinmabia.com/cdn/shop/files/sita-dark-maroon-semi-silk-saree-sarees-375.webp?v=1725373038&width=3840",
      "https://thesareestory.in/wp-content/uploads/2020/10/A4C871D1-322F-4CFC-A415-3CECBA5C0C4D-scaled.jpeg"
    ],
    sizes: ["Free Size"],
    colors: ["Yellow", "Gold"],
    features: ["Mysore Silk", "Glossy Finish", "Classic Borders"],
    stock: 35,
    createdAt: new Date("2023-01-24T12:31:30.123Z")
  },
  {
    _id: new mongoose.Types.ObjectId('00000000000000000000010B'),
    name: "Designer Georgette Silk Saree",
    price: 75.00,
    description: "Stylish georgette silk saree with trendy colors and embroidery.",
    category: new mongoose.Types.ObjectId('000000000000000000000010'),
    images: [
      "https://ivalinmabia.com/cdn/shop/files/sita-dark-maroon-semi-silk-saree-sarees-375.webp?v=1725373038&width=3840",
      "https://thesareestory.in/wp-content/uploads/2020/10/A4C871D1-322F-4CFC-A415-3CECBA5C0C4D-scaled.jpeg"
    ],
    sizes: ["Free Size"],
    colors: ["Peach", "Gold", "White"],
    features: ["Georgette Silk", "Trendy Look", "Embroidered Work"],
    stock: 60,
    createdAt: new Date("2023-01-24T12:31:30.123Z")
  },
  {
    _id: new mongoose.Types.ObjectId('00000000000000000000010C'),
    name: "Kalamkari Printed Silk Saree",
    price: 85.00,
    description: "Hand-painted kalamkari designs on soft silk fabric with earthy tones.",
    category: new mongoose.Types.ObjectId('000000000000000000000011'),
    images: [
      "https://ivalinmabia.com/cdn/shop/files/sita-dark-maroon-semi-silk-saree-sarees-375.webp?v=1725373038&width=3840",
      "https://thesareestory.in/wp-content/uploads/2020/10/A4C871D1-322F-4CFC-A415-3CECBA5C0C4D-scaled.jpeg"
    ],
    sizes: ["Free Size"],
    colors: ["Brown", "Mustard", "Olive"],
    features: ["Silk", "Hand-painted", "Earthy Designs"],
    stock: 55,
    createdAt: new Date("2023-01-24T12:31:30.123Z")
  },
  {
    _id: new mongoose.Types.ObjectId('00000000000000000000010D'),
    name: "Contemporary Art Silk Saree",
    price: 70.00,
    description: "Modern art-inspired prints on smooth silk texture, perfect for casual functions.",
    category: new mongoose.Types.ObjectId('000000000000000000000012'),
    images: [
      "https://ivalinmabia.com/cdn/shop/files/sita-dark-maroon-semi-silk-saree-sarees-375.webp?v=1725373038&width=3840",
      "https://thesareestory.in/wp-content/uploads/2020/10/A4C871D1-322F-4CFC-A415-3CECBA5C0C4D-scaled.jpeg"
    ],
    sizes: ["Free Size"],
    colors: ["Sky Blue", "Navy", "White"],
    features: ["Art Silk", "Abstract Prints", "Soft Finish"],
    stock: 65,
    createdAt: new Date("2023-01-24T12:31:30.123Z")
  },
  {
    _id: new mongoose.Types.ObjectId('00000000000000000000010E'),
    name: "Vintage Tussar Silk Saree",
    price: 115.00,
    description: "Raw texture Tussar silk with natural dye prints and hand-block patterns.",
    category: new mongoose.Types.ObjectId('000000000000000000000013'),
    images: [
      "https://ivalinmabia.com/cdn/shop/files/sita-dark-maroon-semi-silk-saree-sarees-375.webp?v=1725373038&width=3840",
      "https://thesareestory.in/wp-content/uploads/2020/10/A4C871D1-322F-4CFC-A415-3CECBA5C0C4D-scaled.jpeg"
    ],
    sizes: ["Free Size"],
    colors: ["Beige", "Rust", "Grey"],
    features: ["Tussar Silk", "Natural Dye", "Hand Block Prints"],
    stock: 20,
    createdAt: new Date("2023-01-24T12:31:30.123Z")
  }
];

const seedSarees = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Check for existing saree categories and products
    const existingSareeCategory = await Category.findOne({ name: "Silk Sarees" });
    const existingSareeProduct = await Product.findOne({ name: "Elegant Silk Saree" });

    if (existingSareeCategory && existingSareeProduct) {
      console.log('Saree data already exists in the database.');
      console.log('Skipping seeding to preserve existing data.');
      mongoose.connection.close();
      return;
    }

    console.log('Adding saree categories and products...');

    // Add categories
    for (const category of sareeCategories) {
      const existingCategory = await Category.findOne({ _id: category._id });
      if (!existingCategory) {
        await Category.create(category);
      }
    }
    
    // Add products
    for (const product of sareeProducts) {
      const existingProduct = await Product.findOne({ _id: product._id });
      if (!existingProduct) {
        await Product.create(product);
      }
    }

    console.log(`Successfully added ${sareeCategories.length} saree categories and ${sareeProducts.length} saree products!`);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding saree data:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedSarees(); 