import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FarmerNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token from local storage
        alert("Logged out successfully");
        navigate("/login"); // Redirect to login page
      };


    return (
        <div className="bg-blue-600 shadow-lg">
            
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-white text-2xl font-semibold">
                    AgroChain
                </h1>
                <ul className="flex space-x-6">
                    <li>
                    <Link
                        to="/farmerdashboard"
                        className="text-white text-lg hover:text-blue-300 transition"
                    >
                        Home
                    </Link>
                    </li>
                    <li>
                    <Link
                        to="/addfarmerproducts"
                        className="text-white text-lg hover:text-blue-300 transition"
                    >
                        Add Product
                    </Link>
                    </li>
                    <li>
                    <Link
                        to="/productlist"
                        className="text-white text-lg hover:text-blue-300 transition"
                    >
                        Product List
                    </Link>
                    </li>
                    <li>
                    <Link
                        to="/smartcontract"
                        className="text-white text-lg hover:text-blue-300 transition"
                    >
                        Smart Contract
                    </Link>
                    </li>
                    <li>
                    <Link
                        to="/rateofproducts"
                        className="text-white text-lg hover:text-blue-300 transition"
                    >
                        Rate of Product
                    </Link>
                    </li>
                    <li>
                    <Link
                        to="/farmerproductinfo"
                        className="text-white text-lg hover:text-blue-300 transition"
                    >
                        Contract Info
                    </Link>
                    </li>
                    <li>
                    <Link
                        to="/farmerprofile"
                        className="text-white text-lg hover:text-blue-300 transition"
                    >
                        Profile
                    </Link>
                    </li>
                </ul>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                    Logout
                </button>
                </div>
        </div>
    );
};

export default FarmerNavbar;
