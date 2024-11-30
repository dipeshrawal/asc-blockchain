import React from "react";
import { Link, useNavigate } from "react-router-dom";
import backimage from '../../assets/Customerbg.png'
import Navbar from './CustomerNavbar';

const UserDashboard = () => {
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-gray-50" 
    style={{
      backgroundImage:`url(${backimage})`, 
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
      <h1 className="text-3xl font-bold text-black text-center mb-28">
          Welcome to AgroChain 
        </h1>
        <p className="text-lg text-black text-center">
          Navigate through the sections to view and manage data for retailers,
          farmers, and distributors.
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/retailerdata"
            className="block bg-blue-100 hover:bg-blue-200 p-6 text-center rounded-lg shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-blue-600">
              Retailer Data
            </h3>
            <p className="text-gray-600 mt-2">
              View detailed information about retailers.
            </p>
          </Link>
          <Link
            to="/farmerdata"
            className="block bg-green-100 hover:bg-green-200 p-6 text-center rounded-lg shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-green-600">
              Farmer Data
            </h3>
            <p className="text-gray-600 mt-2">
              Access the list of registered farmers.
            </p>
          </Link>
          <Link
            to="/customerproductrate"
            className="block bg-yellow-100 hover:bg-yellow-200 p-6 text-center rounded-lg shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-yellow-600">
              Rate Of Products
            </h3>
            <p className="text-gray-600 mt-2">
              View the current rate of the products.
            </p>
          </Link>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default UserDashboard;
