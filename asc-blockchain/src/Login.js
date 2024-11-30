import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(""); 
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null); // For error messages
  const navigate = useNavigate(); // For navigation

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Login URLs for each user type
    const loginUrls = {
      customer: "http://127.0.0.1:8000/api/customer/login/",
      retailer: "http://127.0.0.1:8000/api/retailer/login/",
      farmer: "http://127.0.0.1:8000/api/farmer/login/",
      distributor: "http://127.0.0.1:8000/api/distributor/login/",
    };

    const loginUrl = loginUrls[userType]; // Get the login URL based on userType

    if (!loginUrl) {
      setError("Please select a valid user type");
      return;
    }

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Only email and password sent
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // Store the token in localStorage
        localStorage.setItem("token", token);
        alert("Login successful");

        // Navigate to the appropriate dashboard based on user type
      if (userType === "customer") {
        navigate("/userDashboard");
      } else if (userType === "farmer") {
        navigate("/farmerdashboard");
      } else if (userType === "retailer") {
        navigate("/retailerdashboard");
      } else if (userType === "distributor") {
        navigate("/distributordashboard");
      }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "An unknown error occurred.");
        console.error("Login failed:", errorData); // Log the error response for debugging
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleRegister = () => {
    navigate("/register"); // Navigate to Signup page
  };

  return (
    <div className="login-container">
      <div className="hamburger-icon" onClick={toggleSidebar}>
        &#9776; {/* Hamburger icon */}
      </div>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="login-box">
        <h2> Login</h2>
        <form onSubmit={handleSubmit}>
          {/* User Type Selector */}
          <div className="input-group">
            <label htmlFor="userType">User Type</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="">Select user type</option>
              <option value="customer">Customer</option>
              <option value="farmer">Farmer</option>
              <option value="retailer">Retailer</option>
              <option value="distributor">Distributor</option>
            </select>
          </div>

          {/* Email Input */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error message */}
          {error && <p className="error-message">{error}</p>}

          {/* Submit Button */}
          <button type="submit" className="login-button">
            Login
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;
