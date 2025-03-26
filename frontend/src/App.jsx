import { Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { useAuth } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import PageLayout from './components/layout/PageLayout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductDetails'
import Categories from './pages/Categories'
import Deals from './pages/Deals'
import Login from './pages/Login'
import Register from './pages/Register'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <PageLayout>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route path="/cart" element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              } />
              <Route path="/categories" element={
                <ProtectedRoute>
                  <Categories />
                </ProtectedRoute>
              } />
              <Route path="/deals" element={
                <ProtectedRoute>
                  <Deals />
                </ProtectedRoute>
              } />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } />
              <Route path="/order-confirmation" element={
                <ProtectedRoute>
                  <OrderConfirmation />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <footer className="bg-white border-t">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    About Us
                  </h3>
                  <p className="mt-4 text-base text-gray-500">
                    FashionStore is your one-stop destination for trendy and comfortable clothing.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    Customer Service
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Shipping Policy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Returns & Exchanges
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        FAQ
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    Shop
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        New Arrivals
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Best Sellers
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Sale
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Gift Cards
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    Connect With Us
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Pinterest
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 border-t border-gray-200 pt-8">
                <p className="text-base text-gray-400 text-center">
                  2024 FashionStore. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </PageLayout>
      </div>
    </CartProvider>
  )
}

export default App