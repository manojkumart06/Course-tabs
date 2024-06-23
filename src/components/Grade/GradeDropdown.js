import React, { useState,useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import './GradeDropdown.scss';

const GradeDropdown = ({ data, onSelectGrade }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    if (data.length > 0) {
      setSelectedItem(data[0].grade);
    }
  }, [data]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelect = (item) => {
    setSelectedItem(item.grade);
    setIsDropdownOpen(false);
    //console.log('item.grade', item.grade)
    if (typeof onSelectGrade === 'function') {
      onSelectGrade(item.grade); // Notify parent component
    }
  };


  return (
    <div className="dropdown">
      <div className="dropdown-trigger" onClick={toggleDropdown}>
        <p className="dropdown-title">{selectedItem}</p>
        <IoIosArrowDown className={`arrow-icon ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </div>
      {isDropdownOpen && (
        <div className="dropdown-content">
          {data
          .filter(item => item.grade !== selectedItem)
          .map((item, index) => (
            <a
              key={index}
              href={`#${item.grade}`}
              className="dropdown-item"
              onClick={() => handleSelect(item)}
            >
              {item.grade}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default GradeDropdown;
