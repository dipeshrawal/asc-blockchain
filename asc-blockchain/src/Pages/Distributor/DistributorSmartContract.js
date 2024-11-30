import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Distributor/DistributorNavbar';

const DistributorSmartContract = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch smart contract data from the API
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        // Fetch distributor profile to get distributor ID
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const profileResponse = await axios.get('http://127.0.0.1:8000/api/distributor/profile', config);
        const distributorId = profileResponse.data.id; // Adjust based on API response structure

        // Fetch all contracts and filter for this distributor
        const contractsResponse = await axios.get('http://127.0.0.1:8000/api/distributor-smart-contracts/');
        const distributorContracts = contractsResponse.data.filter(
          (contract) => contract.initiator === distributorId
        );

        setContracts(distributorContracts);
      } catch (err) {
        console.error('Error fetching contracts or distributor profile:', err);
        setError('Failed to load contracts. Please try again.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchContracts();
  }, []);


  // Handle approval action for distributor
  const handleApprove = async (contractId) => {
    try {
      // Update the distributor_approved field to true
      const response = await axios.patch(`http://127.0.0.1:8000/api/distributor-smart-contracts/${contractId}/`, {
        distributor_approved: true,
      });

      // Update the contract in the state without refetching all contracts
      const updatedContracts = contracts.map(contract => 
        contract.id === contractId ? { ...contract, distributor_approved: true } : contract
      );
      setContracts(updatedContracts);
    } catch (error) {
      console.error('Error approving contract:', error);
      setErrorMessage('Failed to approve contract.');
    }
  };

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
                <th className="px-4 py-2">Actions</th>
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
                            !contract.distributor_approved ? (
                              <button
                                onClick={() => handleApprove(contract.id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                              >
                                Approve
                              </button>
                            ) : (
                              <span className="text-green-500">Approved</span>
                            )
                          )}
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

export default DistributorSmartContract;
