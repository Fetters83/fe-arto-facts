import React, { createContext, useState, useContext, useEffect } from 'react';

const ArtContext = createContext();

export const ArtProvider = ({ children }) => {
  const [exhibitions, setExhibitions] = useState(() => {
    const savedExhibitions = localStorage.getItem('exhibitions');
    return savedExhibitions ? JSON.parse(savedExhibitions) : [];
  });

  useEffect(() => {
    localStorage.setItem('exhibitions', JSON.stringify(exhibitions));
  }, [exhibitions]);

  const createExhibition = (name) => {
    if (name.trim()) {
      const newExhibition = { id: Date.now(), name, artworks: [] };
      setExhibitions((prev) => [...prev, newExhibition]);
    }
  };

  const addArtworkToExhibition = (exhibitionId, artwork) => {
    setExhibitions((prev) =>
      prev.map((exhibition) =>
        exhibition.id === Number(exhibitionId)
          ? { ...exhibition, artworks: [...exhibition.artworks, artwork] }
          : exhibition
      )
    );
  };

  const removeArtworkFromExhibition = (exhibitionId, artworkId) => {
    setExhibitions((prev) =>
      prev.map((exhibition) =>
        exhibition.id === exhibitionId
          ? {
              ...exhibition,
              artworks: exhibition.artworks.filter((artwork) => artwork.id !== artworkId),
            }
          : exhibition
      )
    );
  };

  const removeExhibition = (exhibitionId) => {
    setExhibitions((prev) => prev.filter((exhibition) => exhibition.id !== exhibitionId));
  };

  return (
    <ArtContext.Provider
      value={{
        exhibitions,
        createExhibition,
        addArtworkToExhibition,
        removeArtworkFromExhibition,
        removeExhibition
      }}
    >
      {children}
    </ArtContext.Provider>
  );
};

export const useArtContext = () => useContext(ArtContext);
