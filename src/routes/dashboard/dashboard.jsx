import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.scss";
import Dashboard_Component from "../../components/game/dashboard.component";
import profileImage from "../../assets/me.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("DASHBOARD");
  const [position, setPosition] = useState(1);

  const handleNavigation = (route) => {
    setActiveItem(route);
    switch (route) {
      case "DASHBOARD":
        setActiveItem("DASHBOARD");
        setPosition(1);
        break;
      case "GAME":
        setActiveItem("GAME");
        setPosition(2);
        break;
      case "SETTING":
        setActiveItem("SETTING");
        setPosition(3);
        break;
      case "LOGOUT":
        navigate("/");
        break;
      default:
        break;
    }
  };

  const navItems = ["DASHBOARD", "GAME", "SETTING", "LOGOUT"];

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <img src={profileImage} alt="Logo" className="sidebar-logo" />
        </div>
        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item) => (
              <li
                key={item}
                className={`sidebar-nav-item ${
                  activeItem === item ? "active" : ""
                } ${item === "LOGOUT" ? "logout" : ""}`}
                onClick={() => handleNavigation(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="main-content">
        <div className="header">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>

          <div className="moto">
            <h2>
              {"The cat purred softly.".split("").map((letter, index) => (
                <span key={index}>{letter === " " ? "\u00A0" : letter}</span>
              ))}
            </h2>
          </div>

          <div className="header-profile">
            <img
              src={profileImage}
              alt="Profile"
              className="header-profile-avatar"
            />
          </div>
        </div>
        <div className="content">
          {position === 1 && (
            <div>
              {/* TODO: Add content for the Dashboard position */}
              <h1>Dashboard Content</h1>
            </div>
          )}
          {position === 2 && <Dashboard_Component />}
          {position === 3 && (
            <div>
              {/* TODO: Add content for the Setting position */}
              <h1>Settings Content</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
