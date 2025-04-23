import React from 'react';
import calculosUtils from '../utils/calculosUtils';
import './MonthVisualizer.css';

const MonthVisualizer = ({ birthdate, year = 0 }) => {
  // Month names
  const monthNames = [
    "JAN/ENE", "FEB", "MAR", "APR/ABR", 
    "MAY", "JUN", "JUL", "AUG/AGO", 
    "SEP", "OCT", "NOV", "DEC/DIC"
  ];

  // Calculate month data
  const calculateMonthsData = () => {
    if (!birthdate) return [];

    const currentYear = new Date().getFullYear() + year;
    const months = [];

    for (let i = 0; i < 12; i++) {
      try {
        // Get universal digit for month
        const universalDigit = calculosUtils.sum(i + 1, currentYear);
        
        // Get personal month number
        const splitDate = birthdate.split('/');
        const personalDigit = calculosUtils.sum(parseInt(splitDate[0]), i + 1);
        
        // Calculate other points in the diagram
        const topPoint = calculosUtils.sum(universalDigit, personalDigit);
        const leftPoint = calculosUtils.sum(universalDigit, topPoint);
        const rightPoint = calculosUtils.sum(personalDigit, topPoint);

        months.push({
          Mon: monthNames[i],
          Yea: currentYear,
          MU: universalDigit, // Month Universal
          MP: personalDigit,  // Month Personal
          PT: topPoint,       // Top Point
          PL: leftPoint,      // Left Point
          PR: rightPoint      // Right Point
        });
      } catch (error) {
        console.error(`Error calculating month ${i}:`, error);
        months.push({
          Mon: monthNames[i],
          Yea: currentYear,
          MU: 0,
          MP: 0,
          PT: 0,
          PL: 0,
          PR: 0
        });
      }
    }
    return months;
  };

  const months = calculateMonthsData();

  return (
    <div className="months-container">
      {months.map((month, index) => (
        <div key={index} className="month-box">
          <div className="month-title">{month.Mon}, {month.Yea}</div>
          <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg">
            <g>
              <title>{month.Mon}</title>
              {/* Left Point */}
              <ellipse ry="18.5" rx="16.5" cy="76.98496" cx="19.52745" stroke="#000" fill="#fff"/>
              {/* Bottom Left */}
              <ellipse ry="18.5" rx="16.5" cy="117.98496" cx="66.52745" stroke="#000" fill="#fff"/>
              {/* Bottom Right */}
              <ellipse ry="18.5" rx="16.5" cy="117.98496" cx="131.52745" stroke="#000" fill="#fff"/>
              {/* Right Point */}
              <ellipse ry="18.5" rx="16.5" cy="74.00189" cx="179.56131" stroke="#000" fill="#fff"/>
              {/* Top Point */}
              <ellipse ry="18.5" rx="16.5" cy="27.98496" cx="97.52745" stroke="#000" fill="#fff"/>
              
              {/* Lines connecting all points */}
              <line stroke="#000" y2="65.12905" x2="32.72233" y1="35.48496" x1="82.02745" fill="none"/>
              <line stroke="#000" y2="67.19678" x2="164.40029" y1="32.5019" x1="113.67154" fill="none"/>
              <line y2="44.20121" x2="89.30184" y1="99.45461" x1="66.59032" stroke="#000" fill="none"/>
              <line y2="99.79359" x2="127.60634" y1="43.18427" x1="106.58971" stroke="#000" fill="none"/>
              <line y2="110.64088" x2="51.33631" y1="90.64118" x1="30.31968" stroke="#000" fill="none"/>
              <line stroke="#000" y2="106.91212" x2="144.89422" y1="85.21754" x1="166.5888" fill="none"/>
              <line y2="120.13226" x2="115.06416" y1="120.13226" x1="82.86126" stroke="#000" fill="none"/>
              
              {/* Value text */}
              <text stroke="#000" fontFamily="'Roboto Mono'" strokeWidth="0" y="76.98496" x="19.52745" fontSize="22" dominantBaseline="middle" textAnchor="middle" fill="#000000">{month.PL}</text>
              <text stroke="#000" fontFamily="'Roboto Mono'" strokeWidth="0" y="117.98496" x="66.52745" fontSize="22" dominantBaseline="middle" textAnchor="middle" fill="#000000">{month.MU}</text>
              <text stroke="#000" fontFamily="'Roboto Mono'" strokeWidth="0" y="117.98496" x="131.52745" fontSize="22" dominantBaseline="middle" textAnchor="middle" fill="#000000">{month.MP}</text>
              <text stroke="#000" fontFamily="'Roboto Mono'" strokeWidth="0" y="74.00189" x="179.56131" fontSize="22" dominantBaseline="middle" textAnchor="middle" fill="#000000">{month.PR}</text>
              <text stroke="#000" fontFamily="'Roboto Mono'" strokeWidth="0" y="27.98496" x="97.52745" fontSize="22" dominantBaseline="middle" textAnchor="middle" fill="#000000">{month.PT}</text>
            </g>
          </svg>
        </div>
      ))}
    </div>
  );
};

export default MonthVisualizer; 