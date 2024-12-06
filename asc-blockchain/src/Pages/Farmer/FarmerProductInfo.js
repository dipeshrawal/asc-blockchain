import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './FarmerNavbar';

const FarmerProductInfo = () => {
  const [contracts, setContracts] = useState([]);
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  // Fetch the logged-in farmer's products
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

  // Fetch contracts and filter by product IDs
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/farmer-smart-contracts/');
        
        // Filter contracts by the product IDs of the farmer's products
        const filteredContracts = response.data.filter(
          (contract) => products.some(product => product.id === contract.product)
        );
        
        setContracts(filteredContracts);
      } catch (error) {
        console.error('Error fetching contracts:', error);
        setErrorMessage('Failed to fetch contracts.');
      }
    };

    if (products.length > 0) {
      fetchContracts();
    }
  }, [products]); // Re-fetch contracts when products are available



  return (
    <div className="bg-[#eaf0e1] min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-4">Smart Contracts</h1>
        {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white text-left">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Contract Type</th>
                <th className="px-4 py-2">Initiator</th>
                <th className="px-4 py-2">Receiver</th>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Valid Until</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Farmer Status</th>
              </tr>
            </thead>
            <tbody>
                {contracts.map((contract, index) => {
                  const isExpired = new Date(contract.valid_until) < new Date();
                  return (
                    <tr key={contract.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                      <td className="border px-4 py-2">{contract.id}</td>
                      <td className="border px-4 py-2">{contract.contract_type}</td>
                      <td className="border px-4 py-2">{contract.initiator}</td>
                      <td className="border px-4 py-2">{contract.receiver}</td>
                      <td className="border px-4 py-2">{contract.product}</td>
                      <td className="border px-4 py-2">{contract.status ? 'Active' : 'Inactive'}</td>
                      <td className="border px-4 py-2">{contract.valid_until}</td>
                      <td className="border px-4 py-2">{new Date(contract.created_at).toLocaleDateString()}</td>
                      <td className="border px-4 py-2">
                        {isExpired ? (
                          <span className="text-red-500">Expired</span>
                        ) : (
                          contract.farmer_approved ? 'Approved' : 'Inactive'
                          )
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default FarmerProductInfo;
