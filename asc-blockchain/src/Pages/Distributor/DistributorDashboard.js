import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from './DistributorNavbar';
import agrochain from '../../assets/AgroChain.png'

const DistributorDashboard = () => {
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
            Welcome to Distributor Dashboard
          </h1>
          <p className="text-xl text-black text-center mb-10">
            Manage and monitor farmer, retailer, and product information seamlessly.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
            <Link
              to="/distributorfarmerinfo"
              className="block bg-green-100 hover:bg-green-200 p-6 text-center rounded-lg shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-green-600">
                Farmer Data
              </h3>
              <p className="text-gray-600 mt-2">View and manage farmer details.</p>
            </Link>
            <Link
              to="/distributorretailerinfo"
              className="block bg-blue-100 hover:bg-blue-200 p-6 text-center rounded-lg shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-blue-600">
                Retailer Data
              </h3>
              <p className="text-gray-600 mt-2">View and manage retailer information.</p>
            </Link>
            <Link
              to="/distributorproductinfo"
              className="block bg-yellow-100 hover:bg-yellow-200 p-6 text-center rounded-lg shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-yellow-600">
                Product Information
              </h3>
              <p className="text-gray-600 mt-2">Access and update product details.</p>
            </Link>
            <Link
              to="/realtimeproductdata"
              className="block bg-purple-100 hover:bg-purple-200 p-6 text-center rounded-lg shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-purple-600">
                Real-Time Product Data
              </h3>
              <p className="text-gray-600 mt-2">
                Monitor real-time updates on product status.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributorDashboard;
