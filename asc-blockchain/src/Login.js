import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

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



  return (
    <div className="flex justify-center items-center h-screen bg-green-100 relative">
      <div className="absolute top-5 left-5 text-3xl cursor-pointer text-green-600 z-10" onClick={toggleSidebar}>
        &#9776;
      </div>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="pb-8 text-2xl font-semibold text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="text-left">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Password Input */}
          <div className="text-left">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* User Type Selector with Radio Buttons */}
          <div className="text-left">
            <label htmlFor="userType" className="block text-sm font-medium text-gray-700">User Type</label>
            <div className="mt-2 flex gap-4">
              <div>
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    name="userType" 
                    value="customer" 
                    checked={userType === "customer"} 
                    onChange={(e) => setUserType(e.target.value)} 
                    className="mr-2"
                  />
                  Customer
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    name="userType" 
                    value="farmer" 
                    checked={userType === "farmer"} 
                    onChange={(e) => setUserType(e.target.value)} 
                    className="mr-2"
                  />
                  Farmer
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    name="userType" 
                    value="retailer" 
                    checked={userType === "retailer"} 
                    onChange={(e) => setUserType(e.target.value)} 
                    className="mr-2"
                  />
                  Retailer
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    name="userType" 
                    value="distributor" 
                    checked={userType === "distributor"} 
                    onChange={(e) => setUserType(e.target.value)} 
                    className="mr-2"
                  />
                  Distributor
                </label>
              </div>
            </div>
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Submit Button */}
          <button type="submit" className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition-all">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
