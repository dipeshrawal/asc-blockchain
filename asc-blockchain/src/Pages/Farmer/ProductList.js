import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './FarmerNavbar';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Fetch the logged-in farmer's profile to get their ID
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const profileResponse = await axios.get('http://127.0.0.1:8000/api/farmer/profile', config);
        const farmerId = profileResponse.data.id; // Adjust based on API response structure

        // Fetch products and filter for this farmer
        const productsResponse = await axios.get('http://127.0.0.1:8000/api/farmer-products/');
        const farmerProducts = productsResponse.data.filter(
          (product) => product.farmer === farmerId
        );

        setProducts(farmerProducts);
      } catch (err) {
        console.error('Error fetching products or farmer profile:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false); // Stop loading
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="mx-auto bg-[#eaf0e1]">
      <Navbar />
      <p className="text-2xl font-semibold text-center text-gray-800 mb-10 mt-6">
        Your Products
      </p>

      {loading ? (
        <p className="text-center text-gray-700">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-700">No products found.</p>
      ) : (
        <div className="overflow-x-auto bg-white px-6 shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 font-medium text-gray-700">Product ID</th>
                <th className="py-3 px-4 font-medium text-gray-700">Product Name</th>
                <th className="py-3 px-4 font-medium text-gray-700">Category</th>
                <th className="py-3 px-4 font-medium text-gray-700">Harvest Date</th>
                <th className="py-3 px-4 font-medium text-gray-700">Price per Kg</th>
                <th className="py-3 px-4 font-medium text-gray-700">Quantity (kg)</th>
                <th className="py-3 px-4 font-medium text-gray-700">Batch Number</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-700">{product.id}</td>
                  <td className="py-3 px-4 text-gray-700">{product.name}</td>
                  <td className="py-3 px-4 text-gray-700">{product.category}</td>
                  <td className="py-3 px-4 text-gray-700">{product.harvest_date}</td>
                  <td className="py-3 px-4 text-gray-700">{product.price_per_kg}</td>
                  <td className="py-3 px-4 text-gray-700">{product.quantity}</td>
                  <td className="py-3 px-4 text-gray-700">{product.batch_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductList;
