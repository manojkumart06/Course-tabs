// TabsContainer.js
import React, { useEffect, useState } from 'react';
import MonthlyTab from './MonthlyTab';
import YearlyTab from './YearlyTab';
import Tab from './Tab';
import './TabsContainer.scss'; 


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
          console.log(result);
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
      <div className="tab-list">
        {data.map((tab, index) => (
          <Tab
            key={index}
            label={Object.keys(tab)[0]}
            isActive={Object.keys(tab)[0] === activeTab}
            onClick={() => handleTabClick(Object.keys(tab)[0])}
          />
        ))}
      </div>
      <div className="tab-content">
        {data.map((tab, index) => (
          <div key={index} style={{ display: Object.keys(tab)[0] === activeTab ? 'block' : 'none' }}>
            {Object.keys(tab)[0] === 'yearly' && (
              <YearlyTab data={tab.yearly} />
            )}
            {Object.keys(tab)[0] === 'monthly' && (
               <MonthlyTab data={tab.monthly} />
            )}    
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabsContainer;
