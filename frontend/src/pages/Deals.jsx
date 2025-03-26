import React, { useState } from 'react';

const Deals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('discount');
  const [filterCategory, setFilterCategory] = useState('all');

  // Dummy deals data
  const deals = [
    {
      id: 1,
      title: 'Summer Collection',
      category: 'clothing',
      discount: 50,
      originalPrice: 99.99,
      endTime: '2024-06-30',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&auto=format',
      progress: 75
    },
    {
      id: 2,
      title: 'Premium Watches',
      category: 'accessories',
      discount: 30,
      originalPrice: 299.99,
      endTime: '2024-07-15',
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&auto=format',
      progress: 45
    },
    {
      id: 3,
      title: 'Sports Shoes',
      category: 'footwear',
      discount: 40,
      originalPrice: 129.99,
      endTime: '2024-06-20',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format',
      progress: 90
    },
    {
      id: 4,
      title: 'Designer Bags',
      category: 'accessories',
      discount: 25,
      originalPrice: 199.99,
      endTime: '2024-07-01',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format',
      progress: 60
    }
  ];

  // Filter and sort deals
  const filteredDeals = deals
    .filter(deal => {
      const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || deal.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'discount':
          return b.discount - a.discount;
        case 'price':
          return a.originalPrice - b.originalPrice;
        case 'ending':
          return new Date(a.endTime) - new Date(b.endTime);
        default:
          return 0;
      }
    });

  const calculateTimeLeft = (endTime) => {
    const difference = new Date(endTime) - new Date();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    return `${days} days left`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Hot Deals</h1>
        
        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-96">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search deals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:ml-auto">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full sm:w-48 pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Categories</option>
                <option value="clothing">Clothing</option>
                <option value="accessories">Accessories</option>
                <option value="footwear">Footwear</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-48 pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="discount">Highest Discount</option>
                <option value="price">Lowest Price</option>
                <option value="ending">Ending Soon</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeals.map((deal) => (
          <div
            key={deal.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative">
              <div className="aspect-w-3 aspect-h-2">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {deal.discount}% OFF
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{deal.title}</h3>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-500">{calculateTimeLeft(deal.endTime)}</div>
                <div className="text-sm font-medium">
                  <span className="text-gray-400 line-through">${deal.originalPrice}</span>
                  <span className="text-indigo-600 ml-2">
                    ${(deal.originalPrice * (1 - deal.discount / 100)).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-indigo-600 rounded-full h-2 transition-all duration-300"
                  style={{ width: `${deal.progress}%` }}
                />
              </div>

              <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium 
                hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredDeals.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No deals found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Deals;
