import React from 'react';
// import YearSvg from '../YearSvg';
import YearSvg from '../YearSvgNew';

import './SingleComponent.css';

const YearChartComponent = ({ year, data, isCurrentYear }) => {
  return (
    <div className="centerVertHoriz">
      {/* <p><span style={{ fontWeight: '800', fontSize: '2rem' }}>{year}</span></p> */}
      {data && <YearSvg year={year} data={data} isCurrentYear={isCurrentYear} />}
    </div>
  );
};

export default YearChartComponent; 