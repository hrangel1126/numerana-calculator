import React, { useEffect } from 'react';
import TeamComponent from '../../components/TeamComponent/TeamComponent';
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu';
import './Team.css';

export const Team = ({ setShowMenu }) => {
  useEffect(() => {
    // Hide the default menu since we're using HeaderMenu
    setShowMenu(false);
  }, [setShowMenu]);

  return (
    <>
      <HeaderMenu isHomePage={false} />
      <TeamComponent />
    </>
  );
}; 