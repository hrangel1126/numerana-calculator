import React from 'react';
import './SingleComponent.css';

const MobileYearSliderComponent = ({ 
  currentYear, 
  nextYear, 
  onYearSelect,
  listMobileM,
  mobilMesSelect,
  setMobilMesSelect
}) => {
  return (
    <div className="mobile-year-slider">
      <div className="year-selector">
        <button 
          className={`year-btn ${mobilMesSelect.year === currentYear ? 'active' : ''}`}
          onClick={() => onYearSelect(currentYear)}
        >
          {currentYear}
        </button>
        <button 
          className={`year-btn ${mobilMesSelect.year === nextYear ? 'active' : ''}`}
          onClick={() => onYearSelect(nextYear)}
        >
          {nextYear}
        </button>
      </div>
      
      {listMobileM.length > 0 && (
        <div className="month-selector">
          {listMobileM.map((month, index) => (
            <button 
              key={index} 
              className={`month-btn ${mobilMesSelect.Month === month ? 'active' : ''}`}
              onClick={() => setMobilMesSelect({...mobilMesSelect, Month: month})}
            >
              {month}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileYearSliderComponent; 