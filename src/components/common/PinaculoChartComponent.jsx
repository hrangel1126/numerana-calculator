import React from 'react';
import ExampleChart from './ExampleChart';
import './SingleComponent.css';

const PinaculoChartComponent = ({ pinaculo }) => {
  return (
    <div className="A">
      {pinaculo && <ExampleChart pinaculo={pinaculo} />}
    </div>
  );
};

export default PinaculoChartComponent; 