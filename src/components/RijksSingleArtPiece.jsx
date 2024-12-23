import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useArtContext } from '../contexts/ArtworkContext.jsx';

const RijksSingleArtPiece = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [error, setError] = useState('');
  const { exhibitions, addArtworkToExhibition, createExhibition } = useArtContext();
  const [selectedExhibitionId, setSelectedExhibitionId] = useState('');
  const [newExhibitionName, setNewExhibitionName] = useState('');

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await axios.get(
          `https://be-arto-facts.onrender.com/api/collections/RijksMuseum/${id}`
        );
        setArtwork(response.data);
      } catch (err) {
        setError('Could not fetch the artwork details.');
        console.error(err);
      }
    };

    fetchArtwork();
  }, [id]);

  const handleSaveArtwork = () => {
    if (selectedExhibitionId) {
      addArtworkToExhibition(selectedExhibitionId, artwork);
      alert(`Artwork saved to the exhibition!`);
    } else if (newExhibitionName) {
      const newId = Date.now();
      createExhibition(newExhibitionName);
      addArtworkToExhibition(newId, artwork);
      alert(`Artwork saved to new exhibition "${newExhibitionName}"!`);
      setNewExhibitionName('');
    } else {
      alert('Please select or create an exhibition.');
    }
  };

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (!artwork) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
      >
        Back
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={artwork.img}
          alt={artwork.alt}
          className="w-full h-auto object-cover rounded shadow"
        />
        <div>
          <h1 className="text-2xl font-bold mb-4">{artwork.title}</h1>
          <p className="text-gray-600">
            <strong>Artist:</strong> {artwork.artist}
          </p>
          <p className="text-gray-600">
            <strong>Date:</strong> {artwork.date}
          </p>
          <p className="text-gray-600">
            <strong>Medium:</strong> {artwork.medium.join(', ')}
          </p>
          <p className="text-gray-600">
            <strong>Classification:</strong> {artwork.classification}
          </p>
          <p className="text-gray-600">
            <strong>Department:</strong> {artwork.department.join(', ')}
          </p>
          <p className="text-gray-600">
            <strong>Country:</strong> {artwork.country}
          </p>
          <p className="text-gray-600">
            <strong>Credited to:</strong> {artwork.creditedTo}
          </p>

          <div className="mt-6">
           
            <select
              value={selectedExhibitionId}
              onChange={(e) => setSelectedExhibitionId(e.target.value)}
              className="border px-3 py-2 rounded w-full md:w-auto mb-4"
            >
              <option value="">Select an Exhibition</option>
              {exhibitions.map((exhibition) => (
                <option key={exhibition.id} value={exhibition.id}>
                  {exhibition.name}
                </option>
              ))}
            </select>

          
            <input
              type="text"
              placeholder="Or create a new exhibition"
              value={newExhibitionName}
              onChange={(e) => setNewExhibitionName(e.target.value)}
              className="border px-3 py-2 rounded w-full md:w-auto mb-4"
            />

            <button
              onClick={handleSaveArtwork}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Save to Exhibition
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RijksSingleArtPiece;
