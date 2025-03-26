import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import axios from 'axios'
import config from '../config'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState(0)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/products/${id}`)
        setProduct(response.data)
        setError(null)
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Loading...</h2>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">{error || 'Product not found'}</h2>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select both size and color')
      return
    }

    // Add to cart with selected options and image
    const productWithImage = {
      ...product,
      image: product.images[mainImage] // Add the currently selected image
    }
    addToCart(productWithImage, quantity, selectedSize, selectedColor)
    navigate('/cart')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product Images */}
        <div className="mb-8 lg:mb-0">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <img
              src={product.images[mainImage]}
              alt={product.name}
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setMainImage(index)}
                className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
                  mainImage === index ? 'ring-2 ring-primary' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-center object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-2 text-3xl text-gray-900">${product.price}</p>
          <p className="mt-4 text-gray-500">{product.description}</p>

          {/* Size Selection */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900">Size</h3>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    selectedSize === size
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900">Color</h3>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    selectedColor === color
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
            <div className="mt-2 flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
              >
                -
              </button>
              <span className="text-gray-900">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900">Features</h3>
            <ul className="mt-2 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg
                    className="h-5 w-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="ml-2 text-gray-500">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-8">
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary text-white py-3 px-8 rounded-md hover:bg-primary-dark transition-colors duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails