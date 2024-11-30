import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../Pages/Customer/CustomerNavbar';

const FarmerData = () => {
  const [farmer, setFarmer] = useState(null); // Single farmer object
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFarmerData() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/farmer/farmer-info/");
        setFarmer(response.data); 
      } catch (err) {
        setError("Failed to fetch farmer data. Please try again.");
        console.error("Error fetching farmer data:", err);
      }
    }
    fetchFarmerData();
  }, []);

  return (
    <div className="min-h-screen bg-[#e8f0e1] px-0 pb-6 pt-0">
      <Navbar />
      <p className="text-4xl font-bold text-center text-[#4c9a2a] mb-6 mt-6">
        Farmer Data
      </p>
      <div className="bg-gradient-to-r from-green-100 via-white to-blue-100 p-8 rounded-xl shadow-lg">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : farmer ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-[#4c9a2a] text-white">
                  <th className="py-4 px-6 text-left font-medium">ID</th>
                  <th className="py-4 px-6 text-left font-medium">Farm Name</th>
                  <th className="py-4 px-6 text-left font-medium">Crop Name</th>
                  <th className="py-4 px-6 text-left font-medium">Contact</th>
                  <th className="py-4 px-6 text-left font-medium">Address</th>
                </tr>
              </thead>
              <tbody>
                
                <tr className="border-b text-black border-gray-200 hover:bg-green-100">
                  <td className="py-4 px-6">{farmer.user_ptr_id}</td>
                  <td className="py-4 px-6">{farmer.farm_name}</td>
                  <td className="py-4 px-6">{farmer.crop_name}</td>
                  <td className="py-4 px-6">{farmer.phone_number}</td>
                  <td className="py-4 px-6">{farmer.location}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center">Loading farmer data...</p>
        )}
      </div>
    </div>
  );
};

export default FarmerData;
