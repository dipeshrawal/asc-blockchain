import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './DistributorNavbar';

const DistributorSmartContract = () => {
  const [contracts, setContracts] = useState([]);
  const [retailers, setRetailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContractId, setSelectedContractId] = useState(null);
  const [showRetailerModal, setShowRetailerModal] = useState(false);
  const [selectedRetailerId, setSelectedRetailerId] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const profileResponse = await axios.get('http://127.0.0.1:8000/api/distributor/profile', config);
        const distributorId = profileResponse.data.id;

        const contractsResponse = await axios.get('http://127.0.0.1:8000/api/distributor-smart-contracts/', config);
        const filteredContracts = contractsResponse.data.filter(
          (contract) => contract.initiator === distributorId
        );

        setContracts(filteredContracts);
      } catch (error) {
        console.error('Error fetching contracts:', error);
        setErrorMessage('Failed to load contracts. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  const handleApprove = async (contractId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.patch(
        `http://127.0.0.1:8000/api/distributor-smart-contracts/${contractId}/`,
        { distributor_approved: true },
        config
      );

      const updatedContracts = contracts.map((contract) =>
        contract.id === contractId ? { ...contract, distributor_approved: true } : contract
      );
      setContracts(updatedContracts);
    } catch (error) {
      console.error('Error approving contract:', error);
      setErrorMessage('Failed to approve contract.');
    }
  };

  const fetchRetailers = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get('http://127.0.0.1:8000/api/retailer/retailer-all/', config);
      setRetailers(response.data);
    } catch (error) {
      console.error('Error fetching retailers:', error);
      setErrorMessage('Failed to load retailers.');
    }
  };

  const handleAddRetailer = async () => {
    if (!selectedContractId || !selectedRetailerId) {
      setErrorMessage('Please select a contract and a retailer.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.patch(
        `http://127.0.0.1:8000/api/distributor-smart-contracts/${selectedContractId}/`,
        { receiver: selectedRetailerId },
        config
      );

      const updatedContracts = contracts.map((contract) =>
        contract.id === selectedContractId ? { ...contract, receiver: selectedRetailerId } : contract
      );
      setContracts(updatedContracts);
      setShowRetailerModal(false);
    } catch (error) {
      console.error('Error updating contract:', error);
      setErrorMessage('Failed to update the contract.');
    }
  };

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
        ) : contracts.length === 0 ? (
          <p className="text-center text-gray-700">No contracts found.</p>
        ) : (
          <>
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
                  {paginatedContracts.map((contract, index) => (
                    <tr
                      key={contract.id}
                      className={`cursor-pointer ${
                        selectedContractId === contract.id ? 'bg-yellow-100' : index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                      }`}
                      onClick={() => setSelectedContractId(contract.id)}
                    >
                      <td className="border px-4 py-2">{contract.id}</td>
                      <td className="border px-4 py-2">{contract.contract_type}</td>
                      <td className="border px-4 py-2">{contract.initiator}</td>
                      <td className="border px-4 py-2">{contract.receiver}</td>
                      <td className="border px-4 py-2">{contract.product}</td>
                      <td className="border px-4 py-2">{contract.status ? 'Active' : 'Inactive'}</td>
                      <td className="border px-4 py-2">{contract.valid_until}</td>
                      <td className="border px-4 py-2">{new Date(contract.created_at).toLocaleDateString()}</td>
                      <td className="border px-4 py-2">
                        {!contract.distributor_approved ? (
                          <button
                            onClick={() => handleApprove(contract.id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                          >
                            Approve
                          </button>
                        ) : (
                          <span className="text-green-500">Approved</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            <button
              onClick={() => {
                fetchRetailers();
                setShowRetailerModal(true);
              }}
              disabled={
                !contracts.some(
                  (contract) =>
                    contract.id === selectedContractId &&
                    contract.distributor_approved === true &&
                    contract.receiver === null
                )
              }
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Retailer
            </button>
          </>
        )}
      </div>
      {showRetailerModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Select Retailer</h2>
            <ul className="space-y-2">
              {retailers.map((retailer) => (
                <li key={retailer.id}>
                  <label>
                    <input
                      type="radio"
                      name="retailer"
                      value={retailer.id}
                      onChange={(e) => setSelectedRetailerId(e.target.value)}
                    />
                    {retailer.name}
                  </label>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <button
                onClick={handleAddRetailer}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Retailer
              </button>
              <button
                onClick={() => setShowRetailerModal(false)}
                className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DistributorSmartContract;
