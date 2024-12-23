import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useArtContext } from '../contexts/ArtworkContext.jsx';
import { fetchMetArtworkById } from '../../api.js';

const MetSingleArtWork = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [error, setError] = useState(null);
  const { exhibitions, addArtworkToExhibition, createExhibition } = useArtContext();
  const [selectedExhibitionId, setSelectedExhibitionId] = useState('');
  const [newExhibitionName, setNewExhibitionName] = useState('');

  useEffect(() => {
    const loadArtwork = async () => {
      try {
        const data = await fetchMetArtworkById(id); 
        setArtwork(data); 
      } catch (err) {
        console.error('Error fetching artwork:', err.message);
        setError('Could not fetch the artwork details.');
      }
    };
    loadArtwork();
  }, [id]);



  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  if (!artwork) {
    return <div className="p-6 text-gray-600">Loading artwork details...</div>;
  }

  const handleSaveArtwork = () => {
    const artworkWithCollectionType = {
      ...artwork,
      collectionType: 'MetArtMuseum',
    };
  
    if (selectedExhibitionId) {
      addArtworkToExhibition(selectedExhibitionId, artworkWithCollectionType);
      alert(`Artwork saved to the exhibition!`);
    } else if (newExhibitionName) {
      const newId = Date.now();
      createExhibition(newExhibitionName);
      addArtworkToExhibition(newId, artworkWithCollectionType);
      alert(`Artwork saved to new exhibition "${newExhibitionName}"!`);
      setNewExhibitionName('');
    } else {
      alert('Please select or create an exhibition.');
    }
  };

  return (
    <div className="p-6">
 
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 mb-4"
      >
        Back
      </button>

     
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
  );
};

export default MetSingleArtWork;