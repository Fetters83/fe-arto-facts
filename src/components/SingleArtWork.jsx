import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SingleArtWork = () => {
  const { id } = useParams(); // Get the artwork ID from the URL
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [error, setError] = useState(null);

  // Fetch artwork data by ID
  useEffect(() => {
    const fetchArtWork = async () => {
      try {
        const response = await axios.get(
          `https://be-arto-facts.onrender.com/api/collections/MetArtMuseum/${id}`
        );
        setArtwork(response.data); // Assuming the backend returns the artwork details directly
      } catch (err) {
        console.error('Error fetching artwork:', err.message);
        setError('Could not fetch the artwork details.');
      }
    };
    fetchArtWork();
  }, [id]);

  const handleAddToCollection = () => {
    // Logic to add the artwork to a user's collection
    alert('Add to collection functionality will be implemented later.');
  };

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  if (!artwork) {
    return <div className="p-6 text-gray-600">Loading artwork details...</div>;
  }

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 mb-4"
      >
        Back
      </button>

      {/* Artwork Details */}
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6">
        <img
          src={artwork.img || artwork.smallImg}
          alt={artwork.alt}
          className="w-full md:w-1/2 object-cover mb-4 md:mb-0"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{artwork.title}</h1>
          <p className="text-gray-700 mb-2">
            <strong>Artist:</strong> {artwork.artist}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Classification:</strong> {artwork.classification}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Medium:</strong> {artwork.medium}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Date:</strong> {artwork.date}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Department:</strong> {artwork.department}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Country:</strong> {artwork.country}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Credited To:</strong> {artwork.creditedTo}
          </p>
        </div>
      </div>

      {/* Add to Collection Button */}
      <button
        onClick={handleAddToCollection}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 mt-6"
      >
        Add to Collection
      </button>
    </div>
  );
};

export default SingleArtWork;