import React, { useState } from 'react';

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Dummy categories data
  const categories = [
    { id: 1, name: 'Men\'s Clothing', itemCount: 150, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&auto=format' },
    { id: 2, name: 'Women\'s Clothing', itemCount: 200, image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&auto=format' },
    { id: 3, name: 'Kids\' Clothing', itemCount: 100, image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500&auto=format' },
    { id: 4, name: 'Accessories', itemCount: 80, image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&auto=format' },
    { id: 5, name: 'Footwear', itemCount: 120, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format' },
    { id: 6, name: 'Sportswear', itemCount: 90, image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format' },
  ];

  // Filter and sort categories
  const filteredCategories = categories
    .filter(category => 
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return b.itemCount - a.itemCount;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Categories</h1>
        
        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm">
          <div className="w-full sm:w-96">
            <div className="relative">
              <input
                type="text"
                placeholder="Search categories..."
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
          
          <div className="w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-48 pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="name">Sort by Name</option>
              <option value="items">Sort by Items</option>
            </select>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
          >
            <div className="relative w-full pt-[75%]">
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:opacity-90 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-opacity duration-300" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {category.itemCount} items
              </p>
              <div className="mt-auto">
                <button className="w-full bg-indigo-600 text-white px-4 py-2.5 rounded-md text-sm font-medium 
                  hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  View Category
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
          <p className="text-gray-500">Try adjusting your search term</p>
        </div>
      )}
    </div>
  );
};

export default Categories;
