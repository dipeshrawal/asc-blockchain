import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from './RetailerNavbar';
import agrochain from '../../assets/Retailerbg.png'

const RetailerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    alert("Logged out successfully");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:`url(${agrochain})`, 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'centre',
                        backgroundRepeat: 'no-repeat',
                        minHeight: '100vh',
      }}
    >
      <Navbar/>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="bg-white bg-opacity-[0.4] rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-28">
            Welcome to Retailer Dashboard
          </h1>
          <p className="text-lg text-gray-900 text-center mb-10">
            Manage and access product and farmer data effectively.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            <Link
              to="/retailerdistributordata"
              className="block bg-green-100 hover:bg-green-200 p-6 text-center rounded-lg shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-green-600">
                Distributor Data
              </h3>
              <p className="text-gray-600 mt-2">Access information about farmers.</p>
            </Link>
            <Link
              to="/retailerproductinfo"
              className="block bg-blue-100 hover:bg-blue-200 p-6 text-center rounded-lg shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-blue-600">
                Product Information
              </h3>
              <p className="text-gray-600 mt-2">View details about products.</p>
            </Link>
            <Link
              to="/realtimedataofproduct"
              className="block bg-yellow-100 hover:bg-yellow-200 p-6 text-center rounded-lg shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-yellow-600">
                Real-Time Data
              </h3>
              <p className="text-gray-600 mt-2">Monitor real-time product updates.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerDashboard;
