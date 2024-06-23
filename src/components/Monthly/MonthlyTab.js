import React, { useState, useEffect } from 'react';
import GradeDropdown from '../Grade/GradeDropdown';
import Card from './Card/Card';
import './MonthlyTab.scss';

const MonthlyTab = ({ data }) => {
  const [selectedGrade, setSelectedGrade] = useState(''); 
  const sessionTypes = ['5_sessions', '10_sessions', '20_sessions', '45_sessions'];

  // Update selectedGrade when data changes 
  useEffect(() => {
    if (data.length > 0 && !selectedGrade) {
      setSelectedGrade(data[0].grade); // Set initial selected grade to the first grade in data if not already selected
    }
  }, [data, selectedGrade]);

  const handleSelectGrade = (grade) => {
    setSelectedGrade(grade);
  };

  // Find the data for the selected grade
  const filteredData = data.find(item => item.grade === selectedGrade);

  return (
    <div className="monthly-tab">
      <GradeDropdown data={data} onSelectGrade={handleSelectGrade} />
      <div className="cards-container">
        {filteredData ? (
          sessionTypes.map((sessionType) => (
            <Card key={`${selectedGrade}-${sessionType}`} data={filteredData} sessionType={sessionType} />
          ))
        ) : (
          <div>Data not available for {selectedGrade}</div>
        )}
      </div>
    </div>
  );
};

export default MonthlyTab;
