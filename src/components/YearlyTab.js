// YearlyTab.js
import React from 'react';

const YearlyTab = ({ data }) => {
  return (
    <div>
      <h2>Yearly Data</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YearlyTab;
