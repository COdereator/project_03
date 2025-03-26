import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/products/ProductCard';
import Carousel from '../components/home/Carousel';
import { Link } from 'react-router-dom';
import config from '../config';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products from:', `${config.API_URL}/products`);
        const response = await axios.get(`${config.API_URL}/products`);
        console.log('Product response status:', response.status);
        console.log('Number of products received:', response.data.length);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          url: `${config.API_URL}/products`,
        });
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Carousel */}
      <Carousel />

      {/* Featured Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Add featured categories here */}
        </div>
      </section>

      {/* All Products */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-8">Welcome to Our Store</h1>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">All Products</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 text-primary">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over $100</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 text-primary">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">30-day money-back guarantee</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 text-primary">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Secure Shopping</h3>
              <p className="text-gray-600">100% secure payment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-300 mb-8">Get the latest updates on new products and upcoming sales</p>
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors duration-300"
              >
                Subscribe
              </button>
            </div>
            {isSubscribed && (
              <p className="text-green-400 mt-4">Thank you for subscribing!</p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

export default Home;