import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Navbar from '../Farmer/FarmerNavbar';

const Transaction = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [blockchainHash, setBlockchainHash] = useState('');
  const [transactionFee, setTransactionFee] = useState('');
  const [smartContract, setSmartContract] = useState('');
  const [buyer, setBuyer] = useState('');
  const [customers, setCustomers] = useState([]);

  // Fetch customers for the 'buyer' field
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/transactions/');
        setCustomers(response.data);  // Assuming the API returns a list of customers
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/transactions/', {
        amount,
        payment_method: paymentMethod,
        payment_status: paymentStatus,
        blockchain_hash: blockchainHash,
        transaction_fee: transactionFee,
        smart_contract: smartContract,
        buyer,
      });

      if (response.status === 201) {
        alert('Transaction Added successfully');
      } else {
        alert('Failed to add transaction');
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('There was an error adding the transaction');
    }
  };

  return (
    <div className="bg-[#eaf0e1]">
      {/* <Navbar /> */}
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg mt-6">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-4">Add Transaction</h1>
        <form onSubmit={handleSubmit}>
          {/* Amount */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-600" htmlFor="amount">
              Amount*
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter amount"
              required
            />
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-600" htmlFor="paymentMethod">
              Payment Method*
            </label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select a payment method</option>
              <option value="CASH">Cash</option>
              <option value="CARD">Card</option>
            </select>
          </div>

          {/* Payment Status */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-600" htmlFor="paymentStatus">
              Payment Status*
            </label>
            <select
              id="paymentStatus"
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value === 'true')}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="true">Paid</option>
              <option value="false">Unpaid</option>
            </select>
          </div>

          {/* Blockchain Hash */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-600" htmlFor="blockchainHash">
              Blockchain Hash*
            </label>
            <input
              id="blockchainHash"
              type="text"
              value={blockchainHash}
              onChange={(e) => setBlockchainHash(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter blockchain hash"
              required
            />
          </div>

          {/* Transaction Fee */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-600" htmlFor="transactionFee">
              Transaction Fee*
            </label>
            <input
              id="transactionFee"
              type="number"
              value={transactionFee}
              onChange={(e) => setTransactionFee(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter transaction fee"
              required
            />
          </div>

          {/* Smart Contract */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-600" htmlFor="smartContract">
              Smart Contract ID*
            </label>
            <input
              id="smartContract"
              type="number"
              value={smartContract}
              onChange={(e) => setSmartContract(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter smart contract ID"
              required
            />
          </div>

          {/* Buyer */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-600" htmlFor="buyer">
              Buyer*
            </label>
            <select
              id="buyer"
              value={buyer}
              onChange={(e) => setBuyer(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select a buyer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default Transaction;

