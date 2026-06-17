import React, { createContext, useState, useContext, useEffect } from 'react';

const MenuVisibilityContext = createContext();

export const MenuVisibilityProvider = ({ children }) => {
  // Get menu parameter from URL query string (?menu=false or ?menu=true)
  // ONLY use URL query parameters - do NOT save to localStorage
  const [showMenu, setShowMenuState] = useState(() => {
    // Get URL search params
    const searchParams = new URLSearchParams(window.location.search);
    const menuParam = searchParams.get('menu');
    
    // If URL parameter is 'false', hide menu; otherwise show menu (default)
    if (menuParam !== null) {
      // Convert string 'false' to boolean - only hide if explicitly false
      return menuParam.toLowerCase() !== 'false';
    }
    
    // Default: show menu if no URL parameter provided
    return true;
  });

  // Do NOT save to localStorage - only use URL query parameters
  useEffect(() => {
    // This effect is a placeholder if needed for future enhancements
    // Currently, we do NOT persist to localStorage
  }, []);

  // Wrapper function to set menu visibility
  const setShowMenu = (value) => {
    setShowMenuState(value);
  };

  return (
    <MenuVisibilityContext.Provider value={{ showMenu, setShowMenu }}>
      {children}
    </MenuVisibilityContext.Provider>
  );
};

export const useMenuVisibility = () => {
  const context = useContext(MenuVisibilityContext);
  if (!context) {
    throw new Error('useMenuVisibility must be used within a MenuVisibilityProvider');
  }
  return context;
};

export default MenuVisibilityContext;
