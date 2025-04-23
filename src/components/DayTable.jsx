import React from 'react';
import calculosUtils from '../utils/calculosUtils';
import './DayTable.css';

const DayTable = ({ birthdate }) => {
  // Month names
  const monthNames = [
    "JAN/ENE", "FEB", "MAR", "APR/ABR", 
    "MAY", "JUN", "JUL", "AUG/AGO", 
    "SEP", "OCT", "NOV", "DEC/DIC"
  ];

  // Calculate day data for each month
  const calculateDayData = () => {
    if (!birthdate) return [];
    
    const currentYear = new Date().getFullYear();
    const dayData = [];
    
    // For each month of the year
    for (let month = 0; month < 12; month++) {
      const days = [];
      
      // For each possible day (1-31)
      for (let day = 1; day <= 31; day++) {
        // Check if this day exists in the current month
        const date = new Date(currentYear, month, day);
        if (date.getMonth() !== month) continue; // Skip if day doesn't exist in this month
        
        try {
          // Calculate universal day number
          const universalDay = calculosUtils.sum(day, month + 1, currentYear);
          
          // Calculate personal day number
          const birthDay = parseInt(birthdate.split('/')[0]);
          const personalDay = calculosUtils.sum(day, birthDay);
          
          days.push({
            day,
            universal: universalDay,
            personal: personalDay
          });
        } catch (error) {
          console.error(`Error calculating day ${day} of month ${month}:`, error);
        }
      }
      
      dayData.push({
        month: monthNames[month],
        year: currentYear,
        days
      });
    }
    
    return dayData;
  };

  const dayData = calculateDayData();

  return (
    <div className="day-table-container">
      <div className="day-table-header">
        <div className="day-table-title">D DAY/DÍA</div>
        <div className="day-table-title">U UNIVERSAL</div>
        <div className="day-table-title">P PERSONAL</div>
      </div>
      
      <div className="month-tables">
        {dayData.map((monthData, monthIndex) => (
          <div key={monthIndex} className="month-table">
            <div className="month-header">{monthData.month} {monthData.year}</div>
            <table>
              <thead>
                <tr>
                  <th>D</th>
                  <th>U</th>
                  <th>P</th>
                </tr>
              </thead>
              <tbody>
                {monthData.days.map((day, dayIndex) => (
                  <tr key={dayIndex}>
                    <td>{day.day}</td>
                    <td>{day.universal}</td>
                    <td>{day.personal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayTable; 