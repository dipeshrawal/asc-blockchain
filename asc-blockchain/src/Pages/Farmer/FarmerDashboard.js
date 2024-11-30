import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./FarmerNavbar";
import agrochain from '../../assets/Farmerbg.png'

const FarmerDashboard = () => {

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
      <div className="container mx-auto px-4 py-10" >
        <div className="bg-white bg-opacity-[0.1] rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-white text-center mb-28">
            Welcome to Farmer Dashboard
          </h1>
          <p className="text-xl text-white text-center mb-10">
            Manage your products and monitor rates effectively.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            <Link
              to="/farmerdistributordata"
              className="block bg-blue-100 hover:bg-blue-200 p-6 text-center rounded-lg shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-blue-600">
                Distributor Data
              </h3>
              <p className="text-gray-600 mt-2">Add new products to your list.</p>
            </Link>
            <Link
              to="/farmerretailerdata"
              className="block bg-green-100 hover:bg-green-200 p-6 text-center rounded-lg shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-green-600">
                Retailer Data
              </h3>
              <p className="text-gray-600 mt-2">View and manage your products.</p>
            </Link>
            <Link
              to="/rateofproducts"
              className="block bg-yellow-100 hover:bg-yellow-200 p-6 text-center rounded-lg shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-yellow-600">
                Rate of Products
              </h3>
              <p className="text-gray-600 mt-2">Check the current rates of your products.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
