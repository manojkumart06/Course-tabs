import React, { useEffect, useState } from 'react';
import MonthlyTab from '../Monthly/MonthlyTab';
import YearlyTab from '../Year/YearlyTab';
import './TabsContainer.scss';

// Utility function for String tab name
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1) + ' Courses';
};

const TabsContainer = () => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    let isCancelled = false; // Flag to indicate if the component is unmounted

    const fetchData = async () => {
      try {
        const response = await fetch('/data.json'); // Fetching data from public directory
        const result = await response.json();
        if (!isCancelled) {
          console.log('result data is', result);
          const sortedData = result.sort(tab => Object.keys(tab)[0] === 'yearly' ? -1 : 1);
          setData(sortedData); // Only update state if the component is still mounted
          setActiveTab('monthly'); // Default to the first tab
        }
      } catch (error) {
        if (!isCancelled) {
          console.log("Error in fetching data", error);
        }
      }
    };

    fetchData();

    // Cleanup function to set isCancelled to true
    return () => {
      isCancelled = true;
    };
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  if (data.length === 0) return <div>Loading...</div>;

  return (
    <div className="tabs-container">
      <header>
        <div className="tab-list">
          {data.map((tab, index) => {
            const tabName = Object.keys(tab)[0];
            return (
              <div
                key={index}
                className={`tab ${tabName === activeTab ? 'active-tab' : ''}`}
                onClick={() => handleTabClick(tabName)}
              >
                {capitalizeFirstLetter(tabName)}
              </div>
            );
          })}
        </div>
        <div className="tab-content">
          {data.map((tab, index) => {
            const tabName = Object.keys(tab)[0];
            return (
              <div className='tab-pane' key={index} style={{ display: tabName === activeTab ? 'block' : 'none' }}>
                {tabName === 'yearly' && <YearlyTab data={tab.yearly} />}
                {tabName === 'monthly' && <MonthlyTab data={tab.monthly} />}
              </div>
            );
          })}
        </div>
      </header>
      <footer>
        <div className="top-details">
          <div className="top-text">
            <span className="monthly-text1">
              Monthly classes let you choose <br /> <span className="seperated-text1">your own course topics</span>
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

export default TabsContainer;
