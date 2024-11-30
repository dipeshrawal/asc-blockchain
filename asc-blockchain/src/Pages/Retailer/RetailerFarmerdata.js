import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './RetailerNavbar';

const RetailerFarmerdata = () => {
  const [farmers, setFarmers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch farmer data from the API
  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/farmer/farmer-all');
        setFarmers(response.data);
      } catch (error) {
        console.error('Error fetching farmers:', error);
        setErrorMessage('Failed to fetch farmer data.');
      }
    };

    fetchFarmers();
  }, []);

  return (
    <div className="bg-[#eaf0e1] min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-4">All Farmer Data</h1>
        {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
        {farmers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="bg-blue-500 text-white text-left">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Phone Number</th>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Farm Name</th>
                </tr>
              </thead>
              <tbody>
                {farmers.map((farmer, index) => (
                  <tr key={farmer.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="border px-4 py-2">{farmer.id}</td>
                    <td className="border px-4 py-2">{farmer.name}</td>
                    <td className="border px-4 py-2">{farmer.phone_number}</td>
                    <td className="border px-4 py-2">{farmer.location}</td>
                    <td className="border px-4 py-2">{farmer.email}</td>
                    <td className="border px-4 py-2">{farmer.farm_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-8">No farmer data available.</p>
        )}
      </div>
    </div>
  );
};

export default RetailerFarmerdata;
