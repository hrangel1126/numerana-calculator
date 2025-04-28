import React from 'react';
import DayTable from '../DayTable';
import './SingleComponent.css';

const DesktopDayGridComponent = ({ birthdate, isCouple, birthdate2 }) => {
  return (
    <div className="desktop-day-grid">
      <div className="section-divider"></div>
      <h3 className="section-title">Daily Calculations</h3>
      {birthdate && <DayTable birthdate={birthdate} isCouple={isCouple} birthdate2={birthdate2} />}
    </div>
  );
};

export default DesktopDayGridComponent; 