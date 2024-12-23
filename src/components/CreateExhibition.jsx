import React, { useState } from 'react';
import { useArtContext } from '../contexts/ArtworkContext';

const CreateExhibition = () => {
  const { savedArtworks, createExhibition } = useArtContext();
  const [exhibitionName, setExhibitionName] = useState('');

  const handleCreateExhibition = () => {
    if (exhibitionName && savedArtworks.length > 0) {
      createExhibition(exhibitionName);
      alert(`Exhibition "${exhibitionName}" created successfully!`);
      setExhibitionName('');
    } else {
      alert('Please add artworks to your saved list before creating an exhibition.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create an Exhibition</h2>
      <input
        type="text"
        placeholder="Enter Exhibition Name"
        value={exhibitionName}
        onChange={(e) => setExhibitionName(e.target.value)}
        className="border px-3 py-2 rounded w-full md:w-auto"
      />
      <button
        onClick={handleCreateExhibition}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 ml-4"
      >
        Create Exhibition
      </button>

      <h3 className="text-xl font-bold mt-6">Saved Artworks</h3>
      <ul>
        {savedArtworks.map((artwork) => (
          <li key={artwork.id} className="mt-2">
            {artwork.title} by {artwork.artist}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateExhibition;
