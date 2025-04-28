import React, { useMemo } from 'react';
import moment from 'moment';
import './DayTable.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import CalculosService from '../utils/calculosUtils';

const numerologySum = (number) => {
  while (number > 9 && ![11, 22, 33].includes(number)) {
    number = number.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return number;
};

function NumerologyCalendarGrid({ birthdate, isCouple, birthdate2 }) {
  const dayData = useMemo(() => {
    // Only fetch data if we have a complete birthdate (DD/MM/YYYY)
    if (!birthdate || !/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(birthdate)) {
      return [];
    }
    
    try {
      // Validate parts of the date are complete
      const dateParts = birthdate.split('/');
      if (dateParts.length !== 3 || 
          !dateParts[0] || dateParts[0].length < 1 || 
          !dateParts[1] || dateParts[1].length < 1 || 
          !dateParts[2] || dateParts[2].length < 4) {
        return [];
      }
      
      return CalculosService.GetDays(birthdate);
    } catch (error) {
      console.error("Error calculating days:", error);
      return [];
    }
  }, [birthdate]);

  const isMasterNumber = (num) => [11, 22, 33].includes(num);

  if (!dayData.length) {
    return <div className="container text-center mt-5">Please provide a valid birthdate (DD/MM/YYYY).</div>;
  }

  // Get only current year data (index 0)
  const currentYearData = dayData[0] || [];

  return (
    <div className="container-fluid numerology-calendar-container">
      <div className="relative shadow-md rounded-lg p-2">
        <div className="numerology-row gx-0">
          {currentYearData.map((monthInfo, index) => (
            <div key={index} className="col mescuadro">
              <div className={`numerology-row text-center ${monthInfo.month.length > 3 ? 'smalldias' : 'normaldias'}`}>
                {monthInfo.month} {monthInfo.year}
              </div>

              <div className="col fixprintcol">
                <div className="numerology-row uppercase header-row">
                  <div className="col-4 text-center cuadrito header-cell">D</div>
                  <div className="col-4 text-center cuadrito header-cell">U</div>
                  <div className="col-4 text-center cuadrito header-cell">P</div>
                </div>

                {monthInfo.days.map((dayInfo, diaIndex) => (
                  <div key={diaIndex} className="numerology-row data-row">
                    <div className={`col-4 text-center cuadrito minw day-cell ${dayInfo.vibra22 ? 'vibra22' : ''}`}>
                      {dayInfo.day}
                    </div>
                    <div className={`col-4 text-center cuadrito minw universal-cell ${isMasterNumber(dayInfo.universal) ? 'master-number' : ''}`}>
                      {dayInfo.universal}
                    </div>
                    <div className={`col-4 text-center cuadrito minw personal-cell ${isMasterNumber(dayInfo.personal) ? 'master-number' : ''}`}>
                      {dayInfo.personal}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NumerologyCalendarGrid;