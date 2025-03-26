import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, size = null, color = null) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item._id === product._id &&
          item.size === size &&
          item.color === color
      )

      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      return [...prevItems, { ...product, quantity, size, color }]
    })
  }

  const removeFromCart = (item) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (cartItem) =>
          !(cartItem._id === item._id && 
            cartItem.size === item.size && 
            cartItem.color === item.color)
      )
    )
  }

  const updateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(item)
      return
    }

    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem._id === item._id && 
        cartItem.size === item.size && 
        cartItem.color === item.color
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('cart')
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}