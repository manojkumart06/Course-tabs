import React, { useState } from 'react';
import './Boards.scss'; 

const BoardComponent = ({ data }) => {
  // Split syllabus into an array of topics
  const topics = data.syllabus.split(' ! ');
  
  // Distribute topics into three columns
  const third = Math.ceil(topics.length / 3);
  const column1 = topics.slice(0, third);
  const column2 = topics.slice(third, third * 2);
  const column3 = topics.slice(third * 2);

  return (
    <div className="board-content">
      <div className="board-stats">
        <div>
          <strong>Total sessions</strong>
          <br />
          <span className="data-value">{data.total_sessions}</span>
        </div>
        <div>
          <strong>Online Pre Assignments</strong>
          <br />
          <span className="data-value">{data.online_pre_assignments}</span>
        </div>
        <div>
          <strong>Online Post Assignments</strong>
          <br />
          <span className="data-value">{data.online_post_assignments}</span>
        </div>
        <div>
          <strong>Online Practice</strong>
          <br />
          <span className="data-value">{data.online_assignments}</span>
        </div>
        <div>
          <strong>Online Tests</strong>
          <br />
          <span className="data-value">{data.online_tests}</span>
        </div>
        <div>
          <strong>Career Counselling Sessions</strong>
          <br />
          <span className="data-value">{data.career_counselling_sessions}</span>
        </div>
      </div>
      <div className="course-topics">
        <h4>Course Topics Includes</h4>
        <div className="topics-columns">
          <div className="topics-column">
            {column1.map(topic => (
              <div key={topic}>{topic}</div>
            ))}
          </div>
          <div className="topics-column">
            {column2.map(topic => (
              <div key={topic}>{topic}</div>
            ))}
          </div>
          <div className="topics-column">
            {column3.map(topic => (
              <div key={topic}>{topic}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Boards = ({ board }) => {
  const [activeBoard, setActiveBoard] = useState(Object.keys(board.boards)[0]);

  return (
    <div className="tabs-board-container">
      <div className="tab-board-list">
        {Object.keys(board.boards).map(boardName => (
          <div
            key={boardName}
            className={`tab-board ${activeBoard === boardName ? 'active-tab' : ''}`}
            onClick={() => setActiveBoard(boardName)}
          >
            {boardName}
          </div>
        ))}
      </div>
      <div className="tab-board-content">
        {Object.entries(board.boards).map(([boardName, data]) => (
          <div
            key={boardName}
            className={`tab-board-pane ${activeBoard === boardName ? 'active' : ''}`}
          >
            <BoardComponent data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Boards;
