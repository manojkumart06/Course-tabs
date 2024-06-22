// Tab.js

const Tab = ({ label, content, isActive, onClick }) => {
    return (
      <div
        className={`tab ${isActive ? 'active-tab' : ''}`}
        onClick={onClick}
      >
        {label}
      </div>
    );
  };
  
  export default Tab;
  