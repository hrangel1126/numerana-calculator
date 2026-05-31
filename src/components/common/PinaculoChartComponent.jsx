import React from 'react';
import ExampleChart from './ExampleChart';
import AlignCheck from './AlignCheck';
import './SingleComponent.css';

const PinaculoChartComponent = ({ pinaculo }) => {
  return (
    <div className="A">
      {pinaculo && <AlignCheck pinaculo={pinaculo} />}
    </div>
  );
};

export default PinaculoChartComponent; 