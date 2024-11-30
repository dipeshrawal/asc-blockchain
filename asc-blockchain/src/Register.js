import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // New state for role
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select a role");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, email, contact, address, password, role }),
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
          Create Your Account
        </p>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="col-span-2 md:col-span-1">
            <label htmlFor="fullname" className="block text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
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

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <label htmlFor="contact" className="block text-sm font-medium mb-2">
              Contact
            </label>
            <input
              type="tel"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-300"
            />
          </div>

          {/* Address */}
          <div className="col-span-2 md:col-span-1">
            <label htmlFor="address" className="block text-sm font-medium mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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

          {/* Role */}
          <div className="col-span-2 md:col-span-1">
            <label htmlFor="role" className="block text-sm font-medium mb-2">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-300"
            >
              <option value="">Select a role</option>
              <option value="farmer">Farmer</option>
              <option value="customer">Customer</option>
              <option value="retailer">Retailer</option>
              <option value="distributor">Distributor</option>
            </select>
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

export default Register;
