import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CoupleComponent from '../../components/CoupleComponent';
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu';
import './Couple.css';

const Couple = ({ setShowMenu }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Hide the default menu since we're using HeaderMenu
    setShowMenu(false);
    
    // Set page title
    document.title = 'Numerology Couple Calculator';
  }, [setShowMenu]);

  return (
    <>
      <HeaderMenu isHomePage={false} />
      <CoupleComponent />
    </>
  );
};

export default Couple; 