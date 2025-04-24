import React from 'react';
import MonthVisualizer from '../MonthVisualizer';
import DayTable from '../DayTable';
import './SingleComponent.css';

const MobileMonthDayViewComponent = ({ 
  birthdate, 
  mobilMesSelect,
  smallLoading
}) => {
  return (
    <div className="mobile-month-day-view">
      {smallLoading ? (
        <div className="small-loading">
          <div className="lds-ripple"><div></div><div></div></div>
        </div>
      ) : (
        <>
          {mobilMesSelect.year > 0 && (
            <div className="mobile-month-section">
              <h3 className="section-title">Monthly Calculations for {mobilMesSelect.year}</h3>
              <MonthVisualizer birthdate={birthdate} year={mobilMesSelect.year} />
            </div>
          )}
          
          {mobilMesSelect.Month > 0 && (
            <div className="mobile-day-section">
              <h3 className="section-title">Daily Calculations for {mobilMesSelect.Month}/{mobilMesSelect.year}</h3>
              <DayTable 
                birthdate={birthdate} 
                selectedMonth={mobilMesSelect.Month} 
                selectedYear={mobilMesSelect.year} 
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MobileMonthDayViewComponent; 