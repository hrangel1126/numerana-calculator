import React, { useMemo } from 'react';
import moment from 'moment';
import './DayTable.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const numerologySum = (number) => {
  let numStr = String(number);
  while (numStr.length > 1 && !['11', '22', '33'].includes(numStr)) {
    const sumOfDigits = numStr.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    numStr = String(sumOfDigits);
  }
  return parseInt(numStr, 10);
};

const calculateAndReduce = (val1, val2) => {
  const num1 = Number(val1) || 0;
  const num2 = Number(val2) || 0;
  return numerologySum(num1 + num2);
};

const getDayDataForYear = (birthdate, yearToCalculate, sumFunc) => {
  if (!birthdate || !/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(birthdate)) {
    console.error("Invalid birthdate format. Expected DD/MM/YYYY. Received:", birthdate);
    return [];
  }

  const t = birthdate.split('/');
  const birthDayDigits = t[0].split("").map(d => parseInt(d, 10));
  const birthMonthDigits = t[1].split("").map(d => parseInt(d, 10));

  const sumD = numerologySum(birthDayDigits.reduce((a, c) => a + c, 0));
  const sumM = numerologySum(birthMonthDigits.reduce((a, c) => a + c, 0));

  const uniYearSum = numerologySum(
    yearToCalculate.toString().split("").map(d => parseInt(d, 10)).reduce((a, c) => a + c, 0)
  );

  const perYearSum = numerologySum(sumD + sumM + uniYearSum);

  const monthNames = ["JAN/ENE", "FEB", "MAR", "APR/ABR", "MAY", "JUN", "JUL", "AUG/AGO", "SEP", "OCT", "NOV", "DEC/DIC"];
  const monthData = [];

  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    const currentMonth = monthIndex + 1;
    const dateStr = `${yearToCalculate}-${String(currentMonth).padStart(2, '0')}`;
    const daysInMonth = moment(dateStr).daysInMonth();
    const daysArray = [];

    const uniMonthSum = numerologySum(uniYearSum + currentMonth);
    const perMonthSum = numerologySum(perYearSum + currentMonth);

    for (let dayOfMonth = 1; dayOfMonth <= daysInMonth; dayOfMonth++) {
      const universalDay = sumFunc(uniMonthSum, dayOfMonth);
      const personalDay = sumFunc(perMonthSum, dayOfMonth);

      daysArray.push({
        day: dayOfMonth,
        universal: universalDay,
        personal: personalDay
      });
    }

    monthData.push({
      month: monthNames[monthIndex],
      year: yearToCalculate,
      days: daysArray
    });
  }

  return monthData;
};

function NumerologyCalendarGrid({ birthdate }) {
  const dayData = useMemo(() => {
    if (!birthdate) return [];
    const currentYear = new Date().getFullYear();
    return getDayDataForYear(birthdate, currentYear, calculateAndReduce);
  }, [birthdate]);

  if (!dayData.length) {
    return <div className="container text-center mt-5">Please provide a valid birthdate (DD/MM/YYYY).</div>;
  }

  const isMasterNumber = (num) => [11, 22, 33].includes(num);

  return (
    <div className="container-fluid numerology-calendar-container">
      <div className="relative shadow-md rounded-lg p-2">
      <div className="numerology-row gx-0">          {dayData.map((monthInfo, index) => (
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
                    <div className={`col-4 text-center cuadrito minw day-cell ${dayInfo.personal === 22 ? 'vibra22' : ''}`}>
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