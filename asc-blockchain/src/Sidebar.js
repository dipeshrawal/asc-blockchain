import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const [isRegisterHovered, setIsRegisterHovered] = useState(false); // State to handle Register hover
  const [isRegisterOptionsVisible, setIsRegisterOptionsVisible] = useState(false); // State to control visibility of options

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar(); // Close sidebar
      }
    };

    // Only add event listener if sidebar is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener on component unmount
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, toggleSidebar]);

  const handleNavigation = (path) => {
    navigate(path);
    toggleSidebar(); // Close sidebar after navigation
  };

  const handleRegisterHover = () => {
    setIsRegisterOptionsVisible(true); // Show options when Register is hovered
  };

  const handleRegisterLeave = () => {
    setIsRegisterOptionsVisible(false); // Hide options when hover is removed
  };

  const handleRegisterClick = () => {
    setIsRegisterOptionsVisible(!isRegisterOptionsVisible); // Toggle options on click
  };

  return (
    <div ref={sidebarRef} className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul>
        <li onClick={() => handleNavigation('/')}>Home</li>
        <li onClick={() => handleNavigation('/about')}>About Us</li>
        <li onClick={() => handleNavigation('/contact')}>Contact Us</li>
        
        {/* Login Item */}
        <li 
          onMouseEnter={() => setIsLoginHovered(true)}
          onMouseLeave={() => setIsLoginHovered(false)}
          onClick={() => handleNavigation('/login')}
        >
          Login
        </li>

        {/* Register Item with hover functionality */}
        <li 
          onClick={handleRegisterClick}
          onMouseEnter={handleRegisterHover}
          onMouseLeave={handleRegisterLeave}
        >
          Register
          {isRegisterOptionsVisible && (
            <ul className="register-options">
              <li onClick={() => handleNavigation('/farmerregister')}>Farmer</li>
              <li onClick={() => handleNavigation('/customerregister')}>Customer</li>
              <li onClick={() => handleNavigation('/retailerregister')}>Retailer</li>
              <li onClick={() => handleNavigation('/distributorregister')}>Distributor</li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
