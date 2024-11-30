import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './FarmerNavbar';

const FarmerRetailerData = () => {
  const [retailers, setRetailers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch retailer data from the API
  useEffect(() => {
    const fetchRetailers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/retailer/retailer-all/');
        setRetailers(response.data);
      } catch (error) {
        console.error('Error fetching retailers:', error);
        setErrorMessage('Failed to fetch retailer data.');
      }
    };

    fetchRetailers();
  }, []);

  return (
    <div className="bg-[#eaf0e1] min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-4">All Retailer Data</h1>
        {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
        {retailers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="bg-blue-500 text-white text-left">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Phone Number</th>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Retailer Shop</th>
                </tr>
              </thead>
              <tbody>
                {retailers.map((retailer, index) => (
                  <tr key={retailer.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="border px-4 py-2">{retailer.id}</td>
                    <td className="border px-4 py-2">{retailer.name}</td>
                    <td className="border px-4 py-2">{retailer.phone_number}</td>
                    <td className="border px-4 py-2">{retailer.address}</td>
                    <td className="border px-4 py-2">{retailer.email}</td>
                    <td className="border px-4 py-2">{retailer.shop_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-8">No retailer data available.</p>
        )}
      </div>
    </div>
  );
};

export default FarmerRetailerData;
