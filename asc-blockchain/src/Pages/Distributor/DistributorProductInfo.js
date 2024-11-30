import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './DistributorNavbar';

const DistributorProductInfo = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        // Get the token and set up authorization headers
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch the distributor's profile to get their ID
        const profileResponse = await axios.get('http://127.0.0.1:8000/api/distributor/profile', config);
        const distributorId = profileResponse.data.id;

        // Fetch all contracts and filter by contracts where the distributor is the initiator
        const contractsResponse = await axios.get('http://127.0.0.1:8000/api/distributor-smart-contracts/');
        const distributorContracts = contractsResponse.data.filter(
          (contract) => contract.initiator === distributorId
        );

        // Extract product IDs from filtered contracts
        const productIds = distributorContracts.map((contract) => contract.product);

        // Fetch product details for the extracted product IDs
        const productResponses = await Promise.all(
          productIds.map((productId) =>
            axios.get(`http://127.0.0.1:8000/api/distributor-products/${productId}/`)
          )
        );

        // Consolidate product data
        const fetchedProducts = productResponses.map((response) => response.data);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching product info:', error);
        setErrorMessage('Failed to fetch product information.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductInfo();
  }, []);

  return (
    <div className="bg-[#eaf0e1] min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-4">Distributor Products</h1>
        {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
        {loading ? (
          <p className="text-center text-gray-700">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-700">No products found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="bg-blue-500 text-white text-left">
                  <th className="px-4 py-2">Product ID</th>
                  <th className="px-4 py-2">Product Name</th>
                  
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">QR Code</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="border px-4 py-2">{product.id}</td>
                    <td className="border px-4 py-2">{product.name}</td>
                    
                    <td className="border px-4 py-2">Rs. {product.price_per_kg}</td>
                    <td className="border px-4 py-2">{product.quantity}</td>
                    <td className="border px-4 py-2">{product.category}</td>
                    <td className="py-3 px-4 text-gray-700">
                  {product.qr_code ? (
                    <img
                      src={`http://127.0.0.1:8000${product.qr_code}`}
                      alt={`QR Code for ${product.name}`}
                      className="h-16 w-16 object-contain"
                    />
                  ) : (
                    <span className="text-gray-500">No QR Code</span>
                  )}
                </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DistributorProductInfo;
