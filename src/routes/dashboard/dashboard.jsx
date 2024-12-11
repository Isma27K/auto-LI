import React from "react";
import "./dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <img src="/logo.png" alt="Logo" className="sidebar-logo" />
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="sidebar-nav-item active">DASHBOARD</li>
            <li className="sidebar-nav-item">GAME</li>
            <li className="sidebar-nav-item">SETTING</li>
            <li className="sidebar-nav-item logout">LOGOUT</li>
          </ul>
        </nav>
      </div>
      <div className="main-content">
        <div className="header">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="header-profile">
            <img src="/profile.png" alt="Profile" className="header-profile-avatar" />
          </div>
        </div>
        <div className="content">
          {/* Add your main content here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;