import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHomePage 
          ? isScrolled ? 'bg-white shadow-md' : 'bg-transparent' 
          : 'bg-white shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className={`text-2xl font-bold ${
              isHomePage && !isScrolled ? 'text-white' : 'text-indigo-600'
            }`}>
              Mehndi MDH
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" text="Home" isHomePage={isHomePage} isScrolled={isScrolled} />
            <NavLink to="/shop" text="Shop" isHomePage={isHomePage} isScrolled={isScrolled} />
            {user && (
              <>
                <NavLink to="/categories" text="Categories" isHomePage={isHomePage} isScrolled={isScrolled} />
                <NavLink to="/deals" text="Deals" isHomePage={isHomePage} isScrolled={isScrolled} />
              </>
            )}
          </div>

          {/* Right Side Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link 
                  to="/cart" 
                  className={`relative ${isHomePage && !isScrolled ? 'text-white' : 'text-gray-800'} hover:text-indigo-600 transition-colors duration-200`}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
                <div className="flex items-center space-x-4">
                  <span className={`${isHomePage && !isScrolled ? 'text-white' : 'text-gray-800'} text-sm font-medium`}>
                    {user.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 
                      transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 
                    transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-4 py-2 rounded-lg text-sm font-medium border-2 ${
                    isHomePage && !isScrolled
                      ? 'border-white text-white hover:bg-white hover:text-indigo-600'
                      : 'border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white'
                  } transition-colors duration-200`}
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            <svg
              className={`w-6 h-6 ${
                isHomePage && !isScrolled ? 'text-white' : 'text-gray-800'
              }`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink to="/" text="Home" />
            <MobileNavLink to="/shop" text="Shop" />
            {user && (
              <>
                <MobileNavLink to="/categories" text="Categories" />
                <MobileNavLink to="/deals" text="Deals" />
                <MobileNavLink to="/cart" text="Cart ({cartItems.length})" />
                <div className="px-3 py-2">
                  <span className="block text-sm font-medium text-gray-800">
                    {user.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="mt-2 w-full bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium 
                      hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
            {!user && (
              <div className="px-3 py-2 space-y-2">
                <Link
                  to="/login"
                  className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium 
                    hover:bg-indigo-700 transition-colors duration-200 text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`block w-full px-4 py-2 rounded-md text-sm font-medium border ${
                    isHomePage 
                      ? 'border-white text-white hover:bg-white hover:text-indigo-600' 
                      : 'border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white'
                  } transition-colors duration-200 text-center`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, text, isHomePage, isScrolled }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`text-base font-medium transition-colors duration-300 ${
        isActive 
          ? 'text-indigo-600' 
          : isHomePage && !isScrolled
            ? 'text-white hover:text-gray-200'
            : 'text-gray-800 hover:text-indigo-600'
      }`}
    >
      {text}
    </Link>
  );
};

const MobileNavLink = ({ to, text }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`block px-3 py-2 text-base font-medium rounded-md ${
        isActive
          ? 'text-indigo-600 bg-indigo-50'
          : 'text-gray-800 hover:text-indigo-600 hover:bg-indigo-50'
      }`}
    >
      {text}
    </Link>
  );
};

export default Navbar;