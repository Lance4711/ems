import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaThLarge, FaUser, FaPowerOff } from "react-icons/fa";
import "./Dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        navigate("/");
      }
    });
  };

  return (
    <div className="dashboard-wrapper">
      <div className="sidebar">
        <h2 className="logo">Employee MS</h2>
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item">
            <FaTachometerAlt className="nav-icon" />
            Dashboard
          </Link>
          <Link to="/dashboard/employee" className="nav-item">
            <FaUsers className="nav-icon" />
            Employees
          </Link>
          <Link to="/dashboard/category" className="nav-item">
            <FaThLarge className="nav-icon" />
            Departments
          </Link>
          <Link to="/dashboard/profile" className="nav-item">
            <FaUser className="nav-icon" />
            Leave Requests
          </Link>
          <button className="nav-item logout" onClick={handleLogout}>
            <FaPowerOff className="nav-icon" />
            Logout
          </button>
        </nav>
      </div>

      <div className="main">
        <div className="topbar">
          <h3>Welcome, Admin</h3>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
