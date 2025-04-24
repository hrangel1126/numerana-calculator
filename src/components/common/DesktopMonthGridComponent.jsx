import React from 'react';
import MonthVisualizer from '../MonthVisualizer';
import './SingleComponent.css';

const DesktopMonthGridComponent = ({ birthdate }) => {
  return (
    <div className="desktop-month-grid">
      <div className="section-divider"></div>
      <h3 className="section-title">Monthly Calculations</h3>
      {birthdate && <MonthVisualizer birthdate={birthdate} year={0} />}
    </div>
  );
};

export default DesktopMonthGridComponent; 