import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const About = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutData, setAboutData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/about/');
        setAboutData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching about data:', err);
        setError('Failed to load about information. Please try again later.');
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50 text-green-900">
      <div
        className="absolute top-5 left-5 text-3xl cursor-pointer text-green-700 z-50"
        onClick={toggleSidebar}
      >
        &#9776;
      </div>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg text-center">
        {loading ? (
          <p className="text-xl font-semibold">Loading...</p>
        ) : error ? (
          <p className="text-red-500 font-medium">{error}</p>
        ) : (
          aboutData && (
            <>
              <h1 className="text-2xl font-bold mb-4">{aboutData.title}</h1>
              <p className="text-lg leading-relaxed mb-6">{aboutData.description}</p>
              <div className="text-left">
                <h1 className="text-2xl font-semibold mb-2">Mission</h1>
                <p className="mb-4">{aboutData.mission}</p>
                <h1 className="text-2xl font-semibold mb-2">Vision</h1>
                <p className="mb-4">{aboutData.vision}</p>
                <h1 className="text-2xl font-semibold mb-2">Contact Us</h1>
                <p className="mb-2">
                  <strong>Email:</strong> {aboutData.contact_email}
                </p>
                <p className="mb-2">
                  <strong>Phone:</strong> {aboutData.phone_number}
                </p>
                <p className="mb-2">
                  <strong>Address:</strong> {aboutData.address}
                </p>
                <p>
                  <strong>Website:</strong>{' '}
                  <a
                    href={aboutData.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    {aboutData.website_url}
                  </a>
                </p>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default About;
