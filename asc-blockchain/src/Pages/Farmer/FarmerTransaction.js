import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./FarmerNavbar";

const FarmerTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/farmer-transactions/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to fetch transactions");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="bg-[#eaf0e1] min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto py-8">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Transaction Details
        </h1>

        {loading && <p className="text-center text-gray-500">Loading transactions...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && transactions.length > 0 && (
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b text-left text-gray-600">ID</th>
                <th className="px-6 py-3 border-b text-left text-gray-600">Amount</th>
                <th className="px-6 py-3 border-b text-left text-gray-600">Payment Method</th>
                <th className="px-6 py-3 border-b text-left text-gray-600">Payment Status</th>
                <th className="px-6 py-3 border-b text-left text-gray-600">Blockchain Hash</th>
                <th className="px-6 py-3 border-b text-left text-gray-600">Transaction Fee</th>
                <th className="px-6 py-3 border-b text-left text-gray-600">Created At</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 border-b">{transaction.id}</td>
                  <td className="px-6 py-4 border-b">{transaction.amount}</td>
                  <td className="px-6 py-4 border-b">{transaction.payment_method}</td>
                  <td className="px-6 py-4 border-b">
                    {transaction.payment_status ? "Paid" : "Pending"}
                  </td>
                  <td className="px-6 py-4 border-b">{transaction.blockchain_hash}</td>
                  <td className="px-6 py-4 border-b">{transaction.transaction_fee}</td>
                  <td className="px-6 py-4 border-b">
                    {new Date(transaction.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && !error && transactions.length === 0 && (
          <p className="text-center text-gray-500">No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default FarmerTransaction;
