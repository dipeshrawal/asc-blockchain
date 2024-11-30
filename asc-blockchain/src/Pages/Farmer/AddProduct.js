import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Farmer/FarmerNavbar";

const AddProducts = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [pricePerKg, setPricePerKg] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [farmer, setFarmer] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch farmer's ID on component mount
  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("You need to log in to add products.");
          setLoading(false);
          return;
        }

        // Fetch farmer profile
        const response = await axios.get("http://127.0.0.1:8000/api/farmer/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Set farmer ID
        setFarmer(response.data.id);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching farmer profile:", err);
        setError("Unable to fetch farmer data.");
        setLoading(false);
      }
    };

    fetchFarmerData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedHarvestDate = new Date(harvestDate).toISOString().split("T")[0];

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/farmer-products/", {
        name,
        category,
        quantity: quantity,
        harvest_date: formattedHarvestDate,
        price_per_kg: pricePerKg,
        batch_number: batchNumber,
        farmer,
      });

      if (response.status >= 200 && response.status < 300) {
        alert("Product added successfully");

        // Clear all text fields except the uneditable Farmer ID
        setName("");
        setCategory("");
        setQuantity("");
        setHarvestDate("");
        setPricePerKg("");
        setBatchNumber("");
      } else {
        alert(`Failed adding product. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("There was an error adding the product");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading farmer data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#eaf0e1]">
      <Navbar />
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg mt-6">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-4">Add Products</h1>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-600" htmlFor="name">
              Name*
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-600" htmlFor="category">
              Category*
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select a category</option>
              <option value="FRUIT">Fruit</option>
              <option value="VEGETABLE">Vegetable</option>
              <option value="GRAIN">Grain</option>
              <option value="DAIRY">Dairy</option>
              <option value="MEAT">Meat</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-600" htmlFor="quantity">
              Quantity*
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter quantity"
              required
            />
          </div>

          {/* Harvest Date */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-600" htmlFor="harvestDate">
              Harvest Date*
            </label>
            <input
              id="harvestDate"
              type="date"
              value={harvestDate}
              onChange={(e) => setHarvestDate(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Price per kg */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-600" htmlFor="pricePerKg">
              Price per kg*
            </label>
            <input
              id="pricePerKg"
              type="number"
              value={pricePerKg}
              onChange={(e) => setPricePerKg(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter price per kg"
              required
            />
          </div>

          {/* Batch Number */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-600" htmlFor="batchNumber">
              Batch Number*
            </label>
            <input
              id="batchNumber"
              type="text"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter batch number"
              required
            />
          </div>

          {/* Farmer ID */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-600" htmlFor="farmer">
              Farmer ID*
            </label>
            <input
              id="farmer"
              type="text"
              value={farmer}
              readOnly
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm bg-gray-100 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
