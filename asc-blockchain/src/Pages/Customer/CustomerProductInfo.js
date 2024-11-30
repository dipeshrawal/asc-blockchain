import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './CustomerNavbar';
import { Link, useNavigate } from 'react-router-dom';

const CustomerProductInfo = () => {
  const [products, setProducts] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null); // Track the hovered row for buttons
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const result = await axios.get('http://127.0.0.1:8000/api/customer-products/');
        setProducts(result.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  const handleSmartContract = (productId) => {
    navigate('/customersmartcontract', { state: { productId } });
  };

  const handleTransaction = (productId) => {
    navigate('/customertransaction', { state: { productId } });
    
  };

  return (
    <div className="mx-auto bg-[#eaf0e1]">
      <Navbar />
      <p className="text-2xl font-semibold text-center text-gray-800 mb-10 mt-6">Your Products</p>
      <div className="overflow-x-auto bg-white px-6 shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 font-medium text-gray-700">Product ID</th>
              <th className="py-3 px-4 font-medium text-gray-700">Product Name</th>
              <th className="py-3 px-4 font-medium text-gray-700">Category</th>
              <th className="py-3 px-4 font-medium text-gray-700">Harvest Date</th>
              <th className="py-3 px-4 font-medium text-gray-700">Price per Kg</th>
              <th className="py-3 px-4 font-medium text-gray-700">Quantity(kg)</th>
              <th className="py-3 px-4 font-medium text-gray-700">Batch Number</th>
              <th className="py-3 px-4 font-medium text-gray-700">Farmer Id</th>
              <th className="py-3 px-4 font-medium text-gray-700">QR Scan</th>
              <th className="py-3 px-4 font-medium text-gray-700">Actions</th>
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
                <td className="py-3 px-4 text-gray-700">{product.farmer}</td>
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
                <td
                  className="py-3 px-4 text-gray-700"
                  onMouseEnter={() => setHoveredRow(product.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <div className="flex items-center gap-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
                      View
                    </button>
                    {hoveredRow === product.id && (
                      <div className="flex gap-2">
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                          onClick={() => handleSmartContract(product.id)}
                        >
                          Smart Contract
                        </button>
                        <button
                          className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                          onClick={() => handleTransaction(product.id)}
                        >
                          Transaction
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerProductInfo;
