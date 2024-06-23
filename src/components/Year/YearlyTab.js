import React, { useState } from 'react';
import GradeDropdown from '../Grade/GradeDropdown';
import Boards from './Boards/Boards';
import './YearlyTab.scss';

const YearlyTab = ({ data }) => {
  const [selectedGrade, setSelectedGrade] = useState(data[0].grade);

  const handleSelectGrade = (grade) => {
    setSelectedGrade(grade);
  };

  const selectedData = data.find(item => item.grade === selectedGrade);

  return (
    <div className="yearly-tab">
      <GradeDropdown data={data} onSelectGrade={handleSelectGrade} />
      <div className='tab-container'>
        {selectedData && selectedData.boards && (
          <Boards board={selectedData} />
        )}
      </div>
    </div>
  );
};

export default YearlyTab;
