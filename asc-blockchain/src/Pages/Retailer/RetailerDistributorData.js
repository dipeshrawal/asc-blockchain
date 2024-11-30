import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './RetailerNavbar';

const RetailerDistributorData = () => {
  const [distributors, setDistributors] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch distributor data from the API
  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/distributor/distributor-all');
        setDistributors(response.data);
      } catch (error) {
        console.error('Error fetching distributors:', error);
        setErrorMessage('Failed to fetch distributor data.');
      }
    };

    fetchDistributors();
  }, []);

  return (
    <div className="bg-[#eaf0e1] min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-4">All Distributor Data</h1>
        {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
        {distributors.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="bg-blue-500 text-white text-left">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Phone Number</th>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Company Name</th>
                </tr>
              </thead>
              <tbody>
                {distributors.map((distributor, index) => (
                  <tr key={distributor.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="border px-4 py-2">{distributor.id}</td>
                    <td className="border px-4 py-2">{distributor.name}</td>
                    <td className="border px-4 py-2">{distributor.phone_number}</td>
                    <td className="border px-4 py-2">{distributor.address}</td>
                    <td className="border px-4 py-2">{distributor.email}</td>
                    <td className="border px-4 py-2">{distributor.company_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-8">No distributor data available.</p>
        )}
      </div>
    </div>
  );
};

export default RetailerDistributorData;
