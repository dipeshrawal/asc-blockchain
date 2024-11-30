import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Farmer/FarmerNavbar";

const SmartContract = () => {
  const [contractType, setContractType] = useState("");
  const [product, setProduct] = useState("");
  const [products, setProducts] = useState([]);
  const [termsAndConditions, setTermsAndConditions] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/farmer-products/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setErrorMessage("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/farmer-smart-contracts/",
        {
          contract_type: contractType,
          terms_and_conditions: termsAndConditions,
          payment_terms: paymentTerms,
          valid_until: validUntil,
          product,
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
        setTermsAndConditions("");
        setPaymentTerms("");
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
        {loading && <p className="text-gray-600 text-center">Loading products...</p>}
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
                <option value="SERVICE">Service Agreement</option>
                <option value="PARTNERSHIP">Partnership Agreement</option>
                <option value="PURCHASE_ORDER">Purchase Order</option>
                <option value="SUPPLY_AGREEMENT">Supply Agreement</option>
                <option value="DISTRIBUTION">Distribution Agreement</option>
                <option value="CONTRACT_FARMING">Contract Farming</option>
                <option value="FRANCHISE">Franchise Agreement</option>
                <option value="JOINT_VENTURE">Joint Venture Agreement</option>
                <option value="CONSULTING">Consulting Agreement</option>
                <option value="COOPERATIVE">Cooperative Agreement</option>
                <option value="MEMORANDUM">Memorandum of Understanding</option>
                <option value="OTHER">Other</option>
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

            {/* Terms and Conditions */}
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-600" htmlFor="termsAndConditions">
                Terms and Conditions*
              </label>
              <textarea
                id="termsAndConditions"
                value={termsAndConditions}
                onChange={(e) => setTermsAndConditions(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter terms and conditions"
                required
              />
            </div>

            {/* Payment Terms */}
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-600" htmlFor="paymentTerms">
                Payment Terms*
              </label>
              <textarea
                id="paymentTerms"
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter payment terms"
                required
              />
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
