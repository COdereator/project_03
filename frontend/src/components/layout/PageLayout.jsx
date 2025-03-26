import React from 'react';
import { useLocation } from 'react-router-dom';

const PageLayout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={`min-h-screen ${!isHomePage ? 'pt-16 lg:pt-20' : ''}`}>
      {children}
    </div>
  );
};

export default PageLayout;
