import React from 'react';
import './Card.scss';
import { GoDotFill } from "react-icons/go";

const Card = ({ data, sessionType }) => {
  const { boards, grade } = data;

  // Check if boards exists
  if (!boards) {
    return <div>Data not available for {grade}</div>;
  }

  // Initialize sessionData as null
  let sessionData = null;

  // Iterate through each board type 
  Object.keys(boards).some(boardType => {
    // Check if sessionType exists in the current board type
    if (boards[boardType].hasOwnProperty(sessionType)) {
      sessionData = boards[boardType][sessionType];
      return true; // Exit loop early once sessionData is found
    }
    return false;
  });

  // If sessionData is not found, render message
  if (!sessionData) {
    return <div>Data not available for {grade}</div>;
  }

  // Destructure sessionData for easier access
  const { valid, refund, price, per_class_price, total_sessions, discount } = sessionData;

  // Calculate originalPrice based on a percentage increase
  const percentageIncrease = 12; 
  const originalPrice = Math.round(price * (100 + percentageIncrease) / 100);

  return (
    <div className="card">
      <header>
        <div className="card-content-wrapper">
          <GoDotFill className="dot-icon" />
          <div className="card-content">
            <div className="card-header">
              <div className="price-section">
                <span className='price-valid'>{valid}</span>
                <span className="price">₹{price}</span>
                <span className="original-price">₹{originalPrice}</span>
              </div>
              <span className="per-session-price">₹{per_class_price} per session</span>
            </div>
            <div className="card-pricing">
              <span className='refund'>{refund}</span>
              <span className="discount">{discount} OFF</span>
              <span className="total-sessions">{total_sessions} Sessions</span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Card;
