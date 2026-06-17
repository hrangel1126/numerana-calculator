import React from 'react';
import MonthVisualizer from '../MonthVisualizer';
import './SingleComponent.css';

const DesktopMonthGridComponent = ({ birthdate, isCouple, birthdate2 }) => {
  return (
    <div className="desktop-month-grid">
      <div className="section-divider"></div>
      {/* <h3 className="section-title">Monthly Calculations</h3> */}
      {birthdate && <MonthVisualizer birthdate={birthdate} year={0} isCouple={isCouple} birthdate2={birthdate2} />}
    </div>
  );
};

export default DesktopMonthGridComponent; 