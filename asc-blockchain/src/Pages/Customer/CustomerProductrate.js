import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './CustomerNavbar';

const CustomerProductrate = () => {
  const [productRates, setProductRates] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    async function fetchProductRates() {
      try {
        // Fetch data from /product-rate API
        const response = await axios.get('http://127.0.0.1:8000/api/product-rate');
        setProductRates(response.data);
      } catch (err) {
        console.error('Error fetching product rates:', err);
        setError('Failed to load product rates. Please try again.');
      } finally {
        setLoading(false); // Stop loading
      }
    }

    fetchProductRates();
  }, []);

  return (
    <div className="mx-auto bg-[#eaf0e1]">
      <Navbar />
      <p className="text-2xl font-semibold text-center text-gray-800 mb-10 mt-6">
        Product Rates
      </p>

      {loading ? (
        <p className="text-center text-gray-700">Loading product rates...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : productRates.length === 0 ? (
        <p className="text-center text-gray-700">No product rates found.</p>
      ) : (
        <div className="overflow-x-auto bg-white px-6 shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 font-medium text-gray-700">ID</th>
                <th className="py-3 px-4 font-medium text-gray-700">Name</th>
                <th className="py-3 px-4 font-medium text-gray-700">Price per Kg</th>
                <th className="py-3 px-4 font-medium text-gray-700">Location</th>
              </tr>
            </thead>
            <tbody>
              {productRates.map((productRate) => (
                <tr key={productRate.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-700">{productRate.id}</td>
                  <td className="py-3 px-4 text-gray-700">{productRate.product_name}</td>
                  <td className="py-3 px-4 text-gray-700">{productRate.price_per_kg}</td>
                  <td className="py-3 px-4 text-gray-700">{productRate.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerProductrate;
