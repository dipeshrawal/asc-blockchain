import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from './RetailerNavbar';

const RetailerFarmerdata = () => {
  const [farmers, setFarmers] = useState([]);


  useEffect(() => {
    async function fetchFarmers() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/stakeholder/farmer"
        );
        setFarmers(response.data);
      } catch (error) {
        console.error("Error fetching farmer data:", error);
      }
    }
    fetchFarmers();
  }, []);

  return (
    
    <div className="min-h-screen  bg-[#e8f0e1] px-0 pb-6 pt-0">
        <Navbar/>
      <p className="text-4xl font-bold text-center text-[#4c9a2a] mb-6 mt-6">
        Farmer Data
      </p>
      <div className="bg-gradient-to-r from-green-100 via-white to-blue-100 p-8 rounded-xl shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-[#4c9a2a] text-white">
                <th className="py-4 px-6 text-left font-medium">Name</th>
                <th className="py-4 px-6 text-left font-medium">Email</th>
                <th className="py-4 px-6 text-left font-medium">Contact</th>
                <th className="py-4 px-6 text-left font-medium">Address</th>
              </tr>
            </thead>
            <tbody>
              {farmers.length > 0 ? (
                farmers.map((farmer) => (
                  <tr
                    key={farmer._id}
                    className="border-b border-gray-200 hover:bg-green-100"
                  >
                    <td className="py-4 px-6">{farmer.fullname}</td>
                    <td className="py-4 px-6">{farmer.email}</td>
                    <td className="py-4 px-6">{farmer.contact}</td>
                    <td className="py-4 px-6">{farmer.address}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-4 px-6 text-center text-gray-500"
                  >
                    No farmer data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RetailerFarmerdata;
