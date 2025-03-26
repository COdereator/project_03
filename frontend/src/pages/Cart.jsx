import { useCart } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const { user } = useAuth();
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === 'discount10') {
      setPromoApplied(true)
    }
  }

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setIsCheckingOut(true)
    setTimeout(() => {
      setIsCheckingOut(false)
      navigate('/checkout');
    }, 1000)
  }

  const subtotal = getCartTotal()
  const shipping = cartItems.length > 0 ? 10 : 0
  const discount = promoApplied ? subtotal * 0.1 : 0
  const total = subtotal + shipping - discount

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex items-center p-6 border-b border-gray-200 last:border-b-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="ml-6 flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <p className="text-lg font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      {item.size && <span className="mr-4">Size: {item.size}</span>}
                      {item.color && <span>Color: {item.color}</span>}
                    </div>
                    <div className="mt-4 flex items-center">
                      <button
                        onClick={() => updateQuantity(item, Math.max(0, item.quantity - 1))}
                        className="text-gray-500 hover:text-gray-700 p-1"
                        aria-label="Decrease quantity"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="mx-4 text-gray-900 min-w-[2rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item, item.quantity + 1)}
                        className="text-gray-500 hover:text-gray-700 p-1"
                        aria-label="Increase quantity"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12M6 12h12" />
                        </svg>
                      </button>
                      <button
                        onClick={() => removeFromCart(item)}
                        className="ml-6 text-red-500 hover:text-red-700 flex items-center"
                      >
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">${shipping.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium text-gray-900">Total</span>
                    <span className="text-lg font-medium text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code"
                      className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      onClick={handlePromoCode}
                      disabled={promoApplied}
                      className={`px-4 py-2 rounded-md ${
                        promoApplied
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                    >
                      {promoApplied ? 'Applied' : 'Apply'}
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="mt-2 text-sm text-green-600">Promo code applied successfully!</p>
                  )}
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full px-6 py-3 text-base font-medium rounded-md text-white ${
                    isCheckingOut
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  } transition-colors duration-300`}
                >
                  {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart