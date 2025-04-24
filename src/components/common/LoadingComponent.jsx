import React from 'react';
import './SingleComponent.css';

const LoadingComponent = ({ loading }) => {
  return (
    <div className="loading" style={{display: loading ? 'flex' : 'none'}}>
      <div className="lds-ripple"><div></div><div></div></div>
    </div>
  );
};

export default LoadingComponent; 