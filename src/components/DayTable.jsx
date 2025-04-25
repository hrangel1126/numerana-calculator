import React, { useMemo } from 'react';
import moment from 'moment'; // Import moment
import './DayTable.css';

// CORRECTED numerologySum function to handle master numbers
const numerologySum = (number) => {
  let numStr = String(number);

  // Loop only if the number string has more than one digit AND is NOT a master number
  while (numStr.length > 1 && !['11', '22', '33'].includes(numStr)) {
    // Calculate the sum of digits
    const sumOfDigits = numStr.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    // Convert the sum back to a string for the next iteration or final check
    numStr = String(sumOfDigits);
  }

  // Return the final number (which might be a single digit or a master number)
  return parseInt(numStr, 10);
};

// Helper function combining sum and reduction, matching sumY(a, b) pattern
const calculateAndReduce = (val1, val2) => {
    return numerologySum(val1 + val2);
};


// 2. Adapt GetDays function
// (Made into a standalone function, corrected birthdate parsing, uses calculateAndReduce)
const getDayDataForYear = (birthdate, yearToCalculate, sumFunc) => {
  if (!birthdate || !/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(birthdate)) {
      console.error("Invalid birthdate format provided to getDayDataForYear. Expected DD/MM/YYYY");
      return []; // Return empty array if birthdate is invalid
  }

  const t = birthdate.split('/');
  const birthDayDigits = t[0].toString().split("").map(d => parseInt(d, 10));
  const birthMonthDigits = t[1].toString().split("").map(d => parseInt(d, 10));
  // const birthYearDigits = t[2].toString().split("").map(d => parseInt(d, 10)); // Birth year not used directly in GetDays logic for MU/MP

  // Calculate sum of digits for birth day and month
  const sumD = numerologySum(birthDayDigits.reduce((a, c) => a + c, 0));
  const sumM = numerologySum(birthMonthDigits.reduce((a, c) => a + c, 0));
  // Birth Day number for Personal Day calculation (as used in original component logic)
  const birthDayForPersonal = parseInt(t[0], 10);


  // Calculate Universal Year sum
  const uniYearSum = numerologySum(
      yearToCalculate.toString().split("").map(d => parseInt(d, 10)).reduce((a, c) => a + c, 0)
  );

  // Calculate Personal Year sum (using sumD, sumM as per GetDays logic)
  // Note: Original GetDays formula: PerY = sum(sumD + sumM + UniYear)
  const perYearSum = numerologySum(sumD + sumM + uniYearSum);

  const monthData = [];
  const monthNames = ["JAN/ENE", "FEB", "MAR", "APR/ABR", "MAY", "JUN", "JUL", "AUG/AGO", "SEP", "OCT", "NOV", "DEC/DIC"];

  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    const currentMonth = monthIndex + 1;
    const dateStr = `${yearToCalculate}-${String(currentMonth).padStart(2, '0')}`;
    const daysInMonth = moment(dateStr).daysInMonth();
    const daysArray = [];

    // Universal Month sum: sum(UniYear + currentMonth)
    const uniMonthSum = numerologySum(uniYearSum + currentMonth);
    // Personal Month sum: sum(PerY + currentMonth)
    const perMonthSum = numerologySum(perYearSum + currentMonth);


    for (let dayOfMonth = 1; dayOfMonth <= daysInMonth; dayOfMonth++) {
       try {
            // Universal Day: sum(UniversalMonth + dayOfMonth) -> sum(sum(UniYear + currentMonth) + dayOfMonth)
            // Let's try the simpler version from the *original* DayTable for Universal Day first: sum(day, month, year)
            const universalDayOriginal = numerologySum(dayOfMonth + currentMonth + yearToCalculate);

            // Personal Day: sum(PersonalMonth + dayOfMonth) -> sum(sum(PerY + currentMonth) + dayOfMonth)
            // Let's try the simpler version from the *original* DayTable for Personal Day: sum(day, birthDay)
            const personalDayOriginal = numerologySum(dayOfMonth + birthDayForPersonal);


            // --- OR using the GetDays logic interpretation ---
            // Universal Day (MU in GetDays): sumFunc(uniMonthSum, dayOfMonth)
            const universalDayGetDays = sumFunc(uniMonthSum, dayOfMonth);
            // Personal Day (MP in GetDays): sumFunc(perMonthSum, dayOfMonth)
            const personalDayGetDays = sumFunc(perMonthSum, dayOfMonth);

            // Choose which logic to use. Let's use the GetDays interpretation as requested.
            daysArray.push({
                day: dayOfMonth,
                // universal: universalDayOriginal, // Original component logic
                // personal: personalDayOriginal,   // Original component logic
                universal: universalDayGetDays, // GetDays logic interpretation
                personal: personalDayGetDays    // GetDays logic interpretation
                // veinti2: (22 - (uniYearSum + currentMonth)) === dayOfMonth // 'veinti2' logic from GetDays
            });
        } catch (error) {
           console.error(`Error calculating day ${dayOfMonth} of month ${monthIndex + 1}:`, error);
        }
    }

    monthData.push({
      month: monthNames[monthIndex],
      year: yearToCalculate,
      days: daysArray // Renamed MU to days for consistency
    });
  }

  return monthData; // Return data only for the specified year
};


// 3. Modify DayTable Component
const DayTable = ({ birthdate }) => { // Expect birthdate in DD/MM/YYYY format

  // Calculate data using useMemo based on the adapted GetDays logic
  const dayData = useMemo(() => {
    if (!birthdate) return [];
    const currentYear = new Date().getFullYear();
    // Use the adapted function for the current year
    return getDayDataForYear(birthdate, currentYear, calculateAndReduce);
  }, [birthdate]); // Recalculate only when birthdate changes

  // Handle case where birthdate is invalid or calculation fails
   if (!dayData || dayData.length === 0) {
    // Optionally return null, a message, or a loading indicator
    return <div className="day-table-container">Please provide a valid birthdate (DD/MM/YYYY).</div>;
   }

  return (
    <div className="day-table-container">
      {/* Header remains the same */}
      <div className="day-table-header">
        <div className="day-table-title">D DAY/DÍA</div>
        <div className="day-table-title">U UNIVERSAL</div>
        <div className="day-table-title">P PERSONAL</div>
      </div>

      {/* Rendering logic adapted for the new data structure */}
      <div className="month-tables">
        {dayData.map((monthData, monthIndex) => (
          <div key={monthIndex} className="month-table">
            {/* Use month name and year from the calculated data */}
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
                {/* Iterate through the days array (previously MU) */}
                {/* No need to filter placeholders as getDayDataForYear doesn't add them */}
                {monthData.days.map((dayInfo, dayIndex) => (
                  <tr key={dayIndex}>
                    {/* Access properties using the new names */}
                    <td>{dayInfo.day}</td>
                    <td>{dayInfo.universal}</td>
                    <td>{dayInfo.personal}</td>
                    {/*<td>{dayInfo.veinti2 ? 'Yes' : 'No'}</td>*/} {/* Optional: Display veinti2 if needed */}

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