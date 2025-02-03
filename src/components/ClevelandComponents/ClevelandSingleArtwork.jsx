import React, { useEffect, useState } from 'react';
import { useParams, useNavigate,useLocation } from 'react-router-dom';
import { useArtContext } from '../../contexts/ArtworkContext.jsx';
import { fetchClevelandArtworkById } from '../../../api.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ClevelandSingleArtWork = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPage = location.state?.selectedPage || 0;
  const itemOffset = location.state?.itemOffset || 0;
  const itemsPerPage = location.state?.itemsPerPage || 12; 
  const [artwork, setArtwork] = useState(null);
  const [error, setError] = useState(null);
  const { exhibitions, addArtworkToExhibition, createExhibition } = useArtContext();
  const [selectedExhibitionId, setSelectedExhibitionId] = useState('');
  const [newExhibitionName, setNewExhibitionName] = useState('');
  console.log(location.state)

  useEffect(() => {
    const loadArtwork = async () => {
      try {
        const data = await fetchClevelandArtworkById(id); 
        setArtwork(data); 
      } catch (err) {
        console.error('Error fetching artwork:', err.message);
        setError('Could not fetch the artwork details.');
      }
    };
    loadArtwork();
  }, [id]);



  if (error) {
    return <section className="p-6 text-red-600">{error}</section>;
  }

  if (!artwork) {
    return <section className="p-6 text-gray-600">Loading artwork details...</section>;
  }

  const handleSaveArtwork = () => {
    const artworkWithCollectionType = {
      ...artwork,
      collectionType: 'ClevelandArtMuseum',
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
  const previousPage = location.state?.fromTemporaryExhibitions ? '/exhibitions' : '/collections/clevelandCollection';
  return (
    <section className="p-6">
 
      <button
        onClick={() => navigate(previousPage,{ state: location.state})}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 mb-4"
      >
        Back
      </button>

   
      <section className="flex flex-col md:flex-row items-center md:items-start md:space-x-6">

      {artwork.img && artwork.img !== 'No Image' ? (
 /*  <img
    src={artwork.img}
    alt={artwork.alt}
    className="w-full md:w-1/2 object-cover mb-4 md:mb-0"
  /> */
  <LazyLoadImage
  src={artwork.img}
  alt={artwork.alt}
  effect="blur"
  wrapperProps={{
    style: { transitionDelay: "1s" },
  }}
  className="w-full md:w-1/2 object-cover mb-4 md:mb-0"/>
) : (
  <a 
    href={artwork.linkToWebSiteImg} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-full md:w-1/2 h-64 flex items-center justify-center bg-gray-200 text-center text-sm text-black font-bold p-4 hover:bg-gray-300 cursor-pointer"
  >
    No Image Available - Click Here To access the image for the Cleveland Art Museum Website
  </a>
)}
         
        <section className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{artwork.title}</h1>
          <p className="text-gray-700 mb-2">
            <strong>Artist:</strong> {artwork.artist}
          </p>
            <p className="text-gray-700 mb-2">
            <strong>Medium:</strong> {artwork.type}
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
          <p className="text-gray-700 mb-2">
            <strong>Description</strong> {artwork.description}
          </p>
        </section>
      </section>

      <section className="mt-6">
           
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
          </section>
    </section>
  );
};

export default ClevelandSingleArtWork;