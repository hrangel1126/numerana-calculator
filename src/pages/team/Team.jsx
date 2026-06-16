import React, { useEffect } from 'react';
import TeamComponent from '../../components/TeamComponent/TeamComponent';
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu';
import { useMenuVisibility } from '../../utils/i18n/MenuVisibilityContext';
import './Team.css';

export const Team = () => {
  const { setShowMenu } = useMenuVisibility();
  
  useEffect(() => {
    // Hide the default menu since we're using HeaderMenu
    setShowMenu(false);
  }, []);

  return (
    <>
      <HeaderMenu isHomePage={false} />
      <TeamComponent />
    </>
  );
}; 