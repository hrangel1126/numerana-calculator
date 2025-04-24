import React from 'react';
import DayTable from '../DayTable';
import './SingleComponent.css';

const DesktopDayGridComponent = ({ birthdate }) => {
  return (
    <div className="desktop-day-grid">
      <div className="section-divider"></div>
      <h3 className="section-title">Daily Calculations</h3>
      {birthdate && <DayTable birthdate={birthdate} />}
    </div>
  );
};

export default DesktopDayGridComponent; 