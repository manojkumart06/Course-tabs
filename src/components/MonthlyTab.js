// MonthlyTab.js
import React from 'react';

const MonthlyTab = ({ data }) => {
  return (
    <div>
      <h2>Monthly Data</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthlyTab;
