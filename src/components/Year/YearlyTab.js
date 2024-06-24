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
  //console.log('selectedData is',selectedData)

  return (
    <div className="yearly-tab">
      <GradeDropdown data={data} onSelectGrade={handleSelectGrade} />
      <div className='tab-container'>
        {selectedData && selectedData.boards && (
          <Boards board={selectedData} />
        )}
      </div>
      <footer>
        <div className="footer-content">
          <div className="row top-row">
            <span className="filling-out-soon">Filling out soon</span>
            <span className="discount-info">50% OFF</span>
          </div>
          <div className="row middle-row">
            <span className="vacant-seats">Vacant Seats: <strong>100 seats</strong></span>
            <span className="subscription-cost">
              <span>Subscription cost: <span className="discounted-price">₹ 3999</span></span> <span className="original-price">₹ 5999</span>
              <button className="book-now-button">Book Now</button>
            </span> 
          </div>
          <div className="row bottom-row">
            <span className="info-text">Not a classroom, but 1:1 sessions.</span>
            <span className="cost-inclusive">The cost is inclusive of Tablet cost.</span>
          </div>
          <div className="row per-session-row">
            <span className="per-session-cost">Per session cost is ₹ 129</span>
          </div>
        </div>
        <div className="tablet-guarantee-container">
          <div className="tablet-offer">
            <span>You can also avail a 8 inch and 10 inch tablet with your subscription</span>
          </div>
          <div className="guarantee">
            <span>Guaranteed <a href="/">terms & conditions</a> apply*</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default YearlyTab;
