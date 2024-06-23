import React, { useState } from 'react';
import './Boards.scss';

const BoardComponent = ({ data }) => {
  let syllabusTopics = [];

  if (Array.isArray(data.syllabus)) {
    if (typeof data.syllabus[0] === 'string') {
      syllabusTopics = data.syllabus.map(topic => topic);
    } else {
      syllabusTopics = data.syllabus.flatMap(unit => Object.entries(unit).map(([key, value]) => key));
    }
  } else if (typeof data.syllabus === 'string') {
    syllabusTopics = data.syllabus.split(' ! ');
  }

  const third = Math.ceil(syllabusTopics.length / 3);
  const column1 = syllabusTopics.slice(0, third);
  const column2 = syllabusTopics.slice(third, third * 2);
  const column3 = syllabusTopics.slice(third * 2);

  return (
    <div className="board-content">
      <div className="board-stats">
        <div>
          <strong>Total sessions</strong>
          <span className="data-value">{data.total_sessions}</span>
        </div>
        <div>
          <strong>Online Pre Assignments</strong>
          <span className="data-value">{data.online_pre_assignments}</span>
        </div>
        <div>
          <strong>Online Post Assignments</strong>
          <span className="data-value">{data.online_post_assignments}</span>
        </div>
        <div>
          <strong>Online Practice</strong>
          <span className="data-value">{data.online_assignments}</span>
        </div>
        <div>
          <strong>Online Tests</strong>
          <span className="data-value">{data.online_tests}</span>
        </div>
        <div>
          <strong>Career Counselling Sessions with Edu Coach</strong>
          <span className="data-value">{data.career_counselling_sessions}</span>
        </div>
      </div>
      <div className="course-topics">
        <h4>Course Topics Includes</h4>
        <div className="topics-columns">
          <div className="topics-column">
            {column1.map((topic, index) => (
              <div key={index}>{topic}</div>
            ))}
          </div>
          <div className="topics-column">
            {column2.map((topic, index) => (
              <div key={index}>{topic}</div>
            ))}
          </div>
          <div className="topics-column">
            {column3.map((topic, index) => (
              <div key={index}>{topic}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Boards = ({ board }) => {
  const [activeBoard, setActiveBoard] = useState(Object.keys(board.boards)[0]);

  const getTabWidth = (boardName) => {
    return boardName.length < 10 ? '1%' : `1 ${100 / Object.keys(board.boards).length}%`;
  };

  return (
    <div className="tabs-board-container">
      <div className="tab-board-list">
        {Object.keys(board.boards).map(boardName => (
          <div
            key={boardName}
            className={`tab-board ${activeBoard === boardName ? 'active-tab' : ''}`}
            style={{ flex: getTabWidth(boardName) }}
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
