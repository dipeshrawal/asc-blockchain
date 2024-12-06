import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Retailer/RetailerNavbar';

const RetailerSmartContract = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(null); // Track errors
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const itemsPerPage = 10; // Number of items per page
  const [retailerId, setRetailerId] = useState(null); // Track retailer ID

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        // Get the token and set up authorization headers
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch the retailer's profile to get their ID
        const profileResponse = await axios.get('http://127.0.0.1:8000/api/retailer/profile', config);
        const retailerId = profileResponse.data.id;
        setRetailerId(retailerId);

        // Fetch all contracts
        const contractsResponse = await axios.get('http://127.0.0.1:8000/api/retailer-smart-contracts/', config);
        
        // Filter contracts where the receiver matches the logged-in retailer's ID
        const retailerContracts = contractsResponse.data.filter(
          (contract) => contract.receiver === retailerId
        );
        
        setContracts(retailerContracts);
      } catch (error) {
        console.error('Error fetching contracts:', error);
        setErrorMessage('Failed to load contracts. Please try again.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchContracts();
  }, []);

  // Handle approval action for retailer
  const handleApprove = async (contractId) => {
    try {
      // Get the token and set up authorization headers
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      // Update the retailer_approved field to true
      await axios.patch(
        `http://127.0.0.1:8000/api/retailer-smart-contracts/${contractId}/`,
        { retailer_approved: true}
      );

      // Update the contract in the state without refetching all contracts
      const updatedContracts = contracts.map((contract) =>
        contract.id === contractId ? { ...contract, retailer_approved: true } : contract
      );
      setContracts(updatedContracts);
      
      // Refresh the page to reflect changes (option 1)
      window.location.reload();
    } catch (error) {
      console.error('Error approving contract:', error);
      setErrorMessage('Failed to approve contract.');
    }
  };

  // Paginate contracts based on current page
  const paginatedContracts = contracts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-[#eaf0e1] min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-4">Smart Contracts</h1>
        {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
        {loading ? (
          <p className="text-center text-gray-700">Loading contracts...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : contracts.length === 0 ? (
          <p className="text-center text-gray-700">No contracts found.</p>
        ) : (
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
                {paginatedContracts.map((contract, index) => {
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
                          !contract.retailer_approved ? (
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

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-3 py-1 mx-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Previous
              </button>
              <button
                disabled={currentPage === Math.ceil(contracts.length / itemsPerPage)}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-3 py-1 mx-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RetailerSmartContract;
