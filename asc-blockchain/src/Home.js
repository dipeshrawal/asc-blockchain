import React, { useState } from "react";
import Sidebar from "./Sidebar";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen justify-center items-center relative bg-[#e8f0e1]">
      {/* Hamburger Icon */}
      <div
        className="absolute top-5 left-2.5 text-3xl cursor-pointer z-20 text-[#4c9a2a]"
        onClick={toggleSidebar}
      >
        &#9776; {/* Hamburger icon */}
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="text-center">
        <h1 className="text-4xl mb-5 text-[#4c9a2a]">
          Welcome to Our Agriculture Platform
        </h1>
        <p className="text-lg text-gray-800">
          Explore resources and tools to grow your business.
        </p>
      </div>
    </div>
  );
};

export default Home;
