import React, { useEffect } from 'react';
import SingleComponent from '../../components/SingleComponent';
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu';
import { useMenuVisibility } from '../../utils/i18n/MenuVisibilityContext';

const Single = () => {
  const { setShowMenu } = useMenuVisibility();
  
  // Ensure menu is shown when this component is mounted
  useEffect(() => {
    // Hide the default menu since we're using HeaderMenu
    setShowMenu(false);
  }, []);

  return (
    <>
      <HeaderMenu isHomePage={false} />
      <SingleComponent />
    </>
  );
};

export default Single; 