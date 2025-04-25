import React, { useState, useEffect } from 'react';
import calculosUtils from '../utils/calculosUtils'; // Assuming GetMonth is part of this
import './MonthVisualizer.css';

// Month names (kept from original for consistency if needed, though GetMonth provides them)
const monthNamesFallback = [
    "JAN/ENE", "FEB", "MAR", "APR/ABR", 
    "MAY", "JUN", "JUL", "AUG/AGO", 
    "SEP", "OCT", "NOV", "DEC/DIC"
];

const MonthVisualizer = ({ birthdate, year = 0 }) => {
  const [monthsData, setMonthsData] = useState([]);
  const [targetYear, setTargetYear] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset state on prop change
    setMonthsData([]);
    setError(null);
    setIsLoading(true);

    if (!birthdate) {
      setError("Birthdate is required.");
      setIsLoading(false);
      setMonthsData([]); // Clear data if birthdate is removed
      setTargetYear(null);
      return;
    }

    // Validate birthdate format slightly (basic check)
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(birthdate)) {
        setError("Invalid birthdate format. Please use MM/DD/YYYY.");
        setIsLoading(false);
        setMonthsData([]);
        setTargetYear(null);
        return;
    }

    const calculatedTargetYear = new Date().getFullYear() + year;
    setTargetYear(calculatedTargetYear); // Store the calculated year for display

    try {
      // Call the GetMonth function
      // It returns [[current year months], [next year months]]
      const result = calculosUtils.GetMonth(birthdate);

      // Basic validation of the returned structure
      if (!Array.isArray(result) || result.length !== 2 || !Array.isArray(result[0]) || !Array.isArray(result[1])) {
         console.error("GetMonth returned an unexpected data structure:", result);
         setError("Failed to calculate month data due to unexpected format.");
         setMonthsData([]);
         setIsLoading(false);
         return;
      }
      
      const currentYearData = result[0];
      const nextYearData = result[1];

      let selectedYearData = [];

      // --- Limitation Handling ---
      // GetMonth only provides current and next year. Check if the target year matches.
      if (currentYearData.length > 0 && currentYearData[0].Yea === calculatedTargetYear) {
        selectedYearData = currentYearData;
      } else if (nextYearData.length > 0 && nextYearData[0].Yea === calculatedTargetYear) {
        selectedYearData = nextYearData;
      } else {
         // If the targetYear is not the current or next year, GetMonth doesn't provide data for it.
         console.warn(`MonthVisualizer: GetMonth does not provide data for the requested year (${calculatedTargetYear}). Only current and next year are available.`);
         setError(`Data for year ${calculatedTargetYear} is not available with the current GetMonth function.`);
         // Keep monthsData empty
      }
      
      // Ensure data has the expected keys, even if values are 0 from GetMonth error handling
      const formattedData = selectedYearData.map(month => ({
        Mon: month.Mon || monthNamesFallback[selectedYearData.indexOf(month)] || 'ERR', // Use fallback name if needed
        Yea: month.Yea || calculatedTargetYear,
        MU: month.MU ?? 0,
        MP: month.MP ?? 0,
        PT: month.PT ?? 0,
        PL: month.PL ?? 0,
        PR: month.PR ?? 0
      }));

      setMonthsData(formattedData);

    } catch (err) {
      console.error("Error calling or processing calculosUtils.GetMonth:", err);
      setError(`An error occurred during calculation: ${err.message}`);
      setMonthsData([]);
    } finally {
      setIsLoading(false);
    }

    // Rerun effect if birthdate or year offset changes
  }, [birthdate, year]);

  if (isLoading) {
    return <div className="months-container-message">Loading month data...</div>;
  }

  if (error) {
    return <div className="months-container-message error">Error: {error}</div>;
  }
  
  // Display message if the requested year is unsupported by GetMonth (results in empty data)
  if (!isLoading && !error && monthsData.length === 0 && birthdate) {
     return <div className="months-container-message">No data available for the selected year ({targetYear}). The calculation function might only support the current and next year.</div>;
  }
  
  // Original check if no birthdate is provided initially
  if (!birthdate) {
      return <div className="months-container-message">Please provide a birthdate.</div>;
  }


  return (
    <div className="months-container">
      {/* Display the target year clearly if needed */}
      {/* <h2>Numerology for Year: {targetYear}</h2> */}
      
      {monthsData.map((month, index) => (
        <div key={`${month.Yea}-${month.Mon}-${index}`} className="month-box"> {/* Improved key */}
          <div className="month-title">{month.Mon}, {month.Yea}</div>
          {/* Check if values are valid numbers before rendering SVG? Optional */}
          <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg">
            <g>
              <title>{month.Mon}</title>
              {/* Ellipses and Lines (Structure kept from original) */}
              {/* Left Point */}
              <ellipse ry="18.5" rx="16.5" cy="76.98496" cx="19.52745" stroke="#000" fill="#fff"/>
              {/* Bottom Left (MU) */}
              <ellipse ry="18.5" rx="16.5" cy="117.98496" cx="66.52745" stroke="#000" fill="#fff"/>
              {/* Bottom Right (MP) */}
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
              
              {/* Value text - Using data from monthsData state */}
              {/* Left Point (PL) */}
              <text stroke="#000" fontFamily="'Roboto Mono'" strokeWidth="0" y="76.98496" x="19.52745" fontSize="22" dominantBaseline="middle" textAnchor="middle" fill="#000000">{month.PL}</text>
              {/* Bottom Left (MU) */}
              <text stroke="#000" fontFamily="'Roboto Mono'" strokeWidth="0" y="117.98496" x="66.52745" fontSize="22" dominantBaseline="middle" textAnchor="middle" fill="#000000">{month.MU}</text>
              {/* Bottom Right (MP) */}
              <text stroke="#000" fontFamily="'Roboto Mono'" strokeWidth="0" y="117.98496" x="131.52745" fontSize="22" dominantBaseline="middle" textAnchor="middle" fill="#000000">{month.MP}</text>
               {/* Right Point (PR) */}
              <text stroke="#000" fontFamily="'Roboto Mono'" strokeWidth="0" y="74.00189" x="179.56131" fontSize="22" dominantBaseline="middle" textAnchor="middle" fill="#000000">{month.PR}</text>
              {/* Top Point (PT) */}
              <text stroke="#000" fontFamily="'Roboto Mono'" strokeWidth="0" y="27.98496" x="97.52745" fontSize="22" dominantBaseline="middle" textAnchor="middle" fill="#000000">{month.PT}</text>
            </g>
          </svg>
        </div>
      ))}
    </div>
  );
};

export default MonthVisualizer;