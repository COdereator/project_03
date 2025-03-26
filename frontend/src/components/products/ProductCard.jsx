import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const mainImage = product.images && product.images.length > 0 ? product.images[0] : product.image;

  return (
    <Link to={`/product/${product._id}`} className="group">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
        <img
          src={mainImage}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          style={{
            aspectRatio: '1/1'
          }}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
        
        {/* Stock badge */}
        {(product.stock <= 5 || product.stock === 0) && (
          <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium bg-white shadow-md">
            {product.stock === 0 ? (
              <span className="text-red-500">Out of stock</span>
            ) : (
              <span className="text-orange-500">Only {product.stock} left</span>
            )}
          </div>
        )}
      </div>
      
      {/* Product info */}
      <div className="mt-4 space-y-2">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          {product.category && (
            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
              {product.category.name}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;