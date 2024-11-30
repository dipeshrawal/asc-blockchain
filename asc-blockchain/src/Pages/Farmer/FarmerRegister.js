import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar";

function FarmerRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("farmer"); 
  const [walletaddress, setWalletAddress] = useState("0"); 
  const [farmName, setFarmName] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // New state for phone number
  const [cropName, setCropName] = useState(""); // New state for crop name
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/farmer/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          password,
          password2,
          user_type: userType,
          farm_name: farmName,
          location,
          phone_number: phoneNumber, 
          wallet_address:walletaddress,
          crop_name: cropName, 
        }),
      });

      if (response.ok) {
        alert("Registration successful");
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-200 via-green-300 to-blue-200 relative">
      <div
        className="absolute top-5 left-5 text-2xl text-[#4c9a2a] cursor-pointer"
        onClick={toggleSidebar}
      >
        &#9776; {/* Hamburger icon */}
      </div>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-4xl">
        <p className="text-2xl font-bold text-center text-[#4c9a2a] mb-6">
          Register as a Farmer
        </p>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Name */}
          <div className="col-span-2 md:col-span-1">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-300"
            />
          </div>

          {/* Email */}
          <div className="col-span-2 md:col-span-1">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-300"
            />
          </div>

          {/* Password */}
          <div className="col-span-2 md:col-span-1">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-300"
            />
          </div>

          {/* Confirm Password */}
          <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={password2}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-300"
            />
          </div>

          {/* Farm Name */}
          <div className="col-span-2">
            <label htmlFor="farmName" className="block text-sm font-medium mb-2">
              Farm Name
            </label>
            <input
              type="text"
              id="farmName"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-300"
            />
          </div>

          {/* Location */}
          <div className="col-span-2">
            <label htmlFor="location" className="block text-sm font-medium mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-300"
            />
          </div>

          {/* Phone Number */}
          <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium mb-2"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-300"
            />
          </div>

          {/* Crop Name */}
          <div className="col-span-2 md:col-span-1">
            <label htmlFor="cropName" className="block text-sm font-medium mb-2">
              Crop Name
            </label>
            <input
              type="text"
              id="cropName"
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-300"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full py-3 bg-[#4c9a2a] text-white font-semibold rounded-lg hover:bg-[#3d7d22] transition duration-300"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FarmerRegister;
