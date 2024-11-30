import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './CustomerNavbar';

const CustomerProductInfo = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div className=" mx-auto  bg-[#eaf0e1]">
      <Navbar/>
      <p className=" text-2xl font-semibold text-center text-gray-800 mb-10 mt-6">Your Products</p>
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
              {/* <th className="py-3 px-4 font-medium text-gray-700">QR Code</th> New column */}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-700">{product.id}</td>
                <td className="py-3 px-4 text-gray-700">{product.name}</td>
                <td className="py-3 px-4 text-gray-700">{product.category}</td>
                <td className="py-3 px-4 text-gray-700">{product.harvest_date}</td>
                <td className="py-3 px-4 text-gray-700">{product.price_per_kg}</td>
                <td className="py-3 px-4 text-gray-700">{product.quantity}</td>
                <td className="py-3 px-4 text-gray-700">{product.batch_number}</td>
                <td className="py-3 px-4 text-gray-700">{product.farmer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerProductInfo;
