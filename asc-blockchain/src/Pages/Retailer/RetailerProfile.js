import React, { useEffect, useState } from "react";
import axiosClient from "../../axios"; // Import the axios instance
import Navbar from "./RetailerNavbar";

const RetailerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("You need to log in to view your profile.");
          setLoading(false); // Set loading to false when finished
          return;
        }

        // Fetch the profile data using the token
        const response = await axiosClient.get("http://127.0.0.1:8000/api/retailer/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching profile data:", error); // Log the error for debugging
        setError("Error fetching profile data.");
        setLoading(false); // Set loading to false after error
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading profile...</p> {/* Show loading message */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-600">{error}</p> {/* Show error message if any */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 via-green-400 to-green-500">
      <Navbar />
      <div className="container mx-auto p-6">
        {profile ? (
          <div className="bg-white shadow-lg rounded-2xl p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-semibold text-gray-800 mb-20 text-center">Profile</h1>
            <div className="space-y-6">
            <div className="flex justify-between">
                <span className="text-lg font-medium text-gray-700">ID:</span>
                <span className="text-lg text-gray-900">{profile.id}</span>
              </div>
              <div className="flex justify-between border-b pb-4">
                <span className="text-lg font-medium text-gray-700">Name:</span>
                <span className="text-lg text-gray-900">{profile.name}</span>
              </div>
              <div className="flex justify-between border-b pb-4">
                <span className="text-lg font-medium text-gray-700">Email:</span>
                <span className="text-lg text-gray-900">{profile.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg font-medium text-gray-700">User Type:</span>
                <span className="text-lg text-gray-900">{profile.user_type}</span>
              </div>
              
            </div>
              
              
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-2xl p-8 max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 text-center">No profile data available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RetailerProfile;
