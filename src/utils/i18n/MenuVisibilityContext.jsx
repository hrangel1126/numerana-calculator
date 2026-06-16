import React, { createContext, useState, useContext, useEffect } from 'react';

const MenuVisibilityContext = createContext();

export const MenuVisibilityProvider = ({ children }) => {
  // Get menu parameter from URL query string (?menu=false or ?menu=true)
  const [showMenu, setShowMenuState] = useState(() => {
    // Get URL search params
    const searchParams = new URLSearchParams(window.location.search);
    const menuParam = searchParams.get('menu');
    
    // Priority: URL parameter > localStorage > default (true)
    if (menuParam !== null) {
      // Convert string 'true'/'false' to boolean
      return menuParam.toLowerCase() === 'true';
    }
    
    // Fallback to localStorage if no URL param
    const savedShowMenu = localStorage.getItem('showMenu');
    if (savedShowMenu !== null) {
      return JSON.parse(savedShowMenu);
    }
    
    // Default: show menu
    return true;
  });

  // Update localStorage when showMenu changes (only if not from URL param)
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const menuParam = searchParams.get('menu');
    
    // Only save to localStorage if not controlled by URL parameter
    if (menuParam === null) {
      localStorage.setItem('showMenu', JSON.stringify(showMenu));
    }
  }, [showMenu]);

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
