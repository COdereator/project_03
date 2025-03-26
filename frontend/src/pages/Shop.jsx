import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import config from '../config';

function Shop() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'name',
    search: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get(`${config.API_URL}/products`),
          axios.get(`${config.API_URL}/categories`)
        ]);
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    if (filters.category && (!product.category || product.category.slug !== filters.category)) return false;
    if (filters.minPrice && product.price < parseFloat(filters.minPrice)) return false;
    if (filters.maxPrice && product.price > parseFloat(filters.maxPrice)) return false;
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'name',
      search: ''
    });
  };

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shop All Products</h1>
            <p className="mt-2 text-sm text-gray-500">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="max-w-xl">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Filters */}
        <div className={`transition-all duration-300 overflow-hidden ${showFilters ? 'max-h-96' : 'max-h-0'}`}>
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category._id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Min Price"
                className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />

              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Max Price"
                className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />

              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
            <button
              onClick={resetFilters}
              className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product._id}
                className="animate-fade-in"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-2 text-sm text-gray-500">Try adjusting your filters</p>
            <button
              onClick={resetFilters}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;