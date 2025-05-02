import React, { useEffect } from 'react';
import SingleBasicComponent from '../../components/SingleBasicComponent';
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu';

const SingleBasic = ({ setShowMenu }) => {
  // Ensure menu is shown when this component is mounted
  useEffect(() => {
    // Hide the default menu since we're using HeaderMenu
    setShowMenu(false);
  }, [setShowMenu]);

  return (
    <>
      <HeaderMenu isHomePage={false} />
      <SingleBasicComponent />
    </>
  );
};

export default SingleBasic; 