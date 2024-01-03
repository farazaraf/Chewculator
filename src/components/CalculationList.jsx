// src/components/CalculationList.jsx
import React from 'react';

const CalculationList = ({ calculations }) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Calculation History:</h2>
      <ul className="text-left">
        {calculations.map((calculation, index) => (
          <li key={index} className="mb-1">
            {calculation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalculationList;
