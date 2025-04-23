import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CoupleComponent from '../../components/CoupleComponent';
import './Couple.css';

const Couple = ({ setShowMenu }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Ensure menu is shown when this component is mounted
    setShowMenu(true);
  }, [setShowMenu]);

  return <CoupleComponent />;
};

export default Couple; 