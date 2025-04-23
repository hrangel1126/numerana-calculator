import React, { useEffect } from 'react';
import SingleComponent from '../../components/SingleComponent';
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu';

const Single = ({ setShowMenu }) => {
  // Ensure menu is shown when this component is mounted
  useEffect(() => {
    // Hide the default menu since we're using HeaderMenu
    setShowMenu(false);
  }, [setShowMenu]);

  return (
    <>
      <HeaderMenu isHomePage={false} />
      <SingleComponent />
    </>
  );
};

export default Single; 