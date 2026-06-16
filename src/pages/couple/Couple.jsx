import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CoupleComponent from '../../components/CoupleComponent';
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu';
import { useMenuVisibility } from '../../utils/i18n/MenuVisibilityContext';
import './Couple.css';

const Couple = () => {
  const navigate = useNavigate();
  const { setShowMenu } = useMenuVisibility();
  
  useEffect(() => {
    // Hide the default menu since we're using HeaderMenu
    setShowMenu(false);
    
    // Set page title
    document.title = 'Numerology Couple Calculator';
  }, []);

  return (
    <>
      <HeaderMenu isHomePage={false} />
      <CoupleComponent />
    </>
  );
};

export default Couple; 