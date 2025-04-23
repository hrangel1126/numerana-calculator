import React, { useEffect } from 'react';
import SingleComponent from '../../components/SingleComponent';

const Single = ({ setShowMenu }) => {
  // Ensure menu is shown when this component is mounted
  useEffect(() => {
    setShowMenu(true);
  }, [setShowMenu]);

  return <SingleComponent />;
};

export default Single; 