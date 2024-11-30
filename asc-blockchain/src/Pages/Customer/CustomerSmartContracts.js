import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './CustomerNavbar';

const CustomerSmartContract = () => {
  const { state } = useLocation(); // Get the passed state with productId
  const productId = state?.productId; // Retrieve the productId if available
  const navigate = useNavigate();

  const [contracts, setContracts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/customer-smart-contracts/');
        
        // If productId is passed (navigating from another page), filter by productId
        const filteredContracts = productId
          ? response.data.filter((contract) => contract.product === productId)
          : response.data.filter((contract) => contract.status === true); 

        setContracts(filteredContracts);
      } catch (error) {
        console.error('Error fetching contracts:', error);
        setErrorMessage('Failed to fetch smart contract data.');
      }
    };

    fetchContracts();
  }, [productId]); // Re-fetch when productId changes

  return (
    <div className="bg-[#eaf0e1] min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-4">
          {productId
            ? `Active Smart Contracts for Product ID: ${productId}`
            : 'All Active Smart Contracts'}
        </h1>
        {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
        {contracts.length > 0 ? (
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
                </tr>
              </thead>
              <tbody>
                {contracts.map((contract, index) => (
                  <tr
                    key={contract.id}
                    className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                    onClick={() =>
                      navigate(`/customersmartcontract`, {
                        state: { productId: contract.product }, // Pass the productId when navigating
                      })
                    }
                  >
                    <td className="border px-4 py-2">{contract.id}</td>
                    <td className="border px-4 py-2">{contract.contract_type}</td>
                    <td className="border px-4 py-2">{contract.initiator}</td>
                    <td className="border px-4 py-2">{contract.receiver}</td>
                    <td className="border px-4 py-2">{contract.product}</td>
                    <td className="border px-4 py-2">{contract.status ? 'Active' : 'Inactive'}</td>
                    <td className="border px-4 py-2">{contract.valid_until}</td>
                    <td className="border px-4 py-2">{new Date(contract.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-8">
            No active contracts available.
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomerSmartContract;
