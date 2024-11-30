import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './CustomerNavbar';

const CustomerTransaction = () => {
  const [pricePerKg, setPricePerKg] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [blockchainHash, setBlockchainHash] = useState('0');
  const [transactionFee, setTransactionFee] = useState('10');
  const [smartContract, setSmartContract] = useState('');
  const [buyer, setBuyer] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const { productId } = location.state || {};

  // Fetch price_per_kg and smart_contract_id for the selected product
  useEffect(() => {
    if (productId) {
      const fetchProductDetails = async () => {
        try {
          // Fetch product details
          const productResponse = await axios.get(
            `http://127.0.0.1:8000/api/customer-products/${productId}/`
          );
          setPricePerKg(productResponse.data.price_per_kg);

          const token = localStorage.getItem("token");

        if (!token) {
          setError("You need to log in to add products.");
          setLoading(false);
          return;
        }

        // Fetch farmer profile
        const response = await axios.get("http://127.0.0.1:8000/api/customer/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Set customer ID
        setBuyer(response.data.id);

          // Fetch smart contract details
          const smartContractResponse = await axios.get(
            `http://127.0.0.1:8000/api/customer-smart-contracts/${productId}/`,{
                
            }
          );
          setSmartContract(smartContractResponse.data.smart_contract_id);
        } catch (error) {
          console.error('Error fetching product or smart contract details:', error);
        }
      };

      fetchProductDetails();
    }
  }, [productId]);

  // Fetch customers for the 'buyer' field
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/customer/profile/');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/customer-transactions/', {
        headers: {
            Authorization: `Bearer ${token}`,
          },
        amount: pricePerKg,
        payment_method: paymentMethod,
        blockchain_hash: blockchainHash,
        transaction_fee: transactionFee,
        buyer,
      });

      if (response.status === 201) {
        alert('Transaction Added successfully');
        setPaymentMethod('');
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
        <Navbar/>
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg mt-6">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-4">Add Transaction</h1>
        <form onSubmit={handleSubmit}>
          {/* Amount (Price Per Kg) */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-600" htmlFor="amount">
              Amount (Price Per Kg)*
            </label>
            <input
              id="amount"
              type="text"
              value={pricePerKg}
              disabled
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none bg-gray-100"
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

          {/* Transaction Fee */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-600" htmlFor="transactionFee">
              Transaction Fee*
            </label>
            <input
              id="transactionFee"
              type="number"
              disabled
              value={transactionFee}
              onChange={(e) => setTransactionFee(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter transaction fee"
              required
            />
          </div>

          {/* Buyer */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-600" htmlFor="buyer">
              Buyer*
            </label>
            <input
              id="buyer"
              value={buyer}
              disabled
              onChange={(e) => setBuyer(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
              
                
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

export default CustomerTransaction;
