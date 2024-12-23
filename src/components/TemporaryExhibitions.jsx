import React from 'react';
import { useArtContext } from '../contexts/ArtworkContext.jsx';
import { useNavigate } from 'react-router-dom';

const TemporaryExhibitions = () => {
  const { exhibitions, removeArtworkFromExhibition, removeExhibition } = useArtContext();
  const navigate = useNavigate();

  const handleArtworkClick = (artwork) => {
    if (artwork.collectionType === 'MetArtMuseum') {
      navigate(`/collections/metCollection/${artwork.id}`);
    } else if (artwork.collectionType === 'RijksMuseum') {
      navigate(`/collections/rijksCollection/${artwork.id}`);
    } else if (artwork.collectionType === 'ArtInstituteChicago') {
      navigate(`/collections/chicagoCollection/${artwork.id}`);
    } else {
      console.error('Unknown collection type for artwork:', artwork);
    }
  };



  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Temporary Exhibitions</h1>
      {exhibitions.length === 0 ? (
        <p>No exhibitions created yet.</p>
      ) : (
        exhibitions.map((exhibition) => (
          <div key={exhibition.id} className="mb-6 border p-4 rounded">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{exhibition.name}</h2>
              <button
                onClick={() => removeExhibition(exhibition.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete Exhibition
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exhibition.artworks.length === 0 ? (
                <p>No artworks saved to this exhibition.</p>
              ) : (
                exhibition.artworks.map((artwork) => (
                  <div key={artwork.id} className="border rounded shadow p-4">
                    <img
                      src={artwork.smallImg || artwork.img}
                      alt={artwork.alt}
                      className="w-full h-48 object-cover mb-4 cursor-pointer"
                      onClick={() => handleArtworkClick(artwork)}
                    />
                    <h3 className="text-lg font-bold">{artwork.title}</h3>
                    <p className="text-gray-600">{artwork.artist}</p>
                    <button
                      onClick={() => removeArtworkFromExhibition(exhibition.id, artwork.id)}
                      className="mt-4 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700"
                    >
                      Remove Artwork
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TemporaryExhibitions;
