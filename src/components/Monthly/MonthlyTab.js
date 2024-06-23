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
      <header>
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
      </header>
      <footer>
        <div className="top-details">
          <div className="top-text">
            <span className="monthly-text1">
              Monthly classes let you choose <br /> <span className="separated-text1">your own course topics</span>
            </span>
            <span className="monthly-text2">Each session lasts 45 minutes</span>
            <span className="book-button">
              <button>Book Now</button>
            </span>
          </div>
        </div>
        <div className="bottom-details">
          <div className="bottom-text">
            <span className="terms_condition-text">
              Refund same day <a href="/terms-and-conditions">terms & conditions</a> apply*
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MonthlyTab;

