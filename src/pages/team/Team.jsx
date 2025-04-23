import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TeamComponent from '../../components/TeamComponent/TeamComponent';
import './Team.css';

export const Team = ({ setShowMenu }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure menu is shown when this component is mounted
    setShowMenu(true);
  }, [setShowMenu]);

  return <TeamComponent />;
}; 