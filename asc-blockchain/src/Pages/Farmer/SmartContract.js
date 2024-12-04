import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Farmer/FarmerNavbar";

const SmartContract = () => {
  const [contractType, setContractType] = useState("");
  const [product, setProduct] = useState("");
  const [distributor, setDistributor] = useState("");
  const [products, setProducts] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [validUntil, setValidUntil] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductsAndDistributors = async () => {
      const token = localStorage.getItem("token");
      try {
        // Fetch products
        const productResponse = await axios.get("http://127.0.0.1:8000/api/farmer-products/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Fetch distributors
        const distributorResponse = await axios.get("http://127.0.0.1:8000/api/distributor/distributor-all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(productResponse.data);
        setDistributors(distributorResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchProductsAndDistributors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/farmer-smart-contracts/",
        {
          contract_type: contractType,
          valid_until: validUntil,
          product,
          initiator:distributor,
          farmer_approved: true,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Smart Contract added successfully!");
        navigate("/farmerproductinfo");
        setContractType("");
        setProduct("");
        setDistributor("");
        setValidUntil("");
      } else {
        setErrorMessage("Failed to add smart contract");
      }
    } catch (error) {
      console.error("Error adding smart contract:", error);
      setErrorMessage("There was an error adding the smart contract");
    }
  };

  return (
    <div className="bg-[#eaf0e1]">
      <Navbar />
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg mt-6">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-4">Add Smart Contract</h1>
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        {loading && <p className="text-gray-600 text-center">Loading data...</p>}
        {!loading && products.length === 0 && (
          <p className="text-gray-600 text-center">No products found for this farmer.</p>
        )}
        {!loading && products.length > 0 && (
          <form onSubmit={handleSubmit}>
            {/* Contract Type */}
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-600" htmlFor="contractType">
                Contract Type*
              </label>
              <select
                id="contractType"
                value={contractType}
                onChange={(e) => setContractType(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select contract type</option>
                <option value="SALE">Sale</option>
                <option value="LEASE">Lease</option>
                {/* Add other options as necessary */}
              </select>
            </div>

            {/* Product */}
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-600" htmlFor="product">
                Product ID*
              </label>
              <select
                id="product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select product</option>
                {products.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    {prod.id} - {prod.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Distributor */}
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-600" htmlFor="distributor">
                Distributor*
              </label>
              <select
                id="distributor"
                value={distributor}
                onChange={(e) => setDistributor(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select distributor</option>
                {distributors.map((dist) => (
                  <option key={dist.id} value={dist.id}>
                    {dist.id} - {dist.name}
                  </option>
                ))}
              </select>
            </div>



            {/* Valid Until */}
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-600" htmlFor="validUntil">
                Valid Until*
              </label>
              <input
                id="validUntil"
                type="date"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Add Smart Contract
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SmartContract;
