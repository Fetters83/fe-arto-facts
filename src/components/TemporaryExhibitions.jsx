import React from 'react';
import { useArtContext } from '../contexts/ArtworkContext.jsx';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const TemporaryExhibitions = () => {
  const { exhibitions, removeArtworkFromExhibition, removeExhibition } = useArtContext();
  const navigate = useNavigate();

  const handleArtworkClick = (artwork) => {
    let destinationPath = '';
  
    if (artwork.collectionType === 'ClevelandArtMuseum') {
      destinationPath = `/collections/clevelandCollection/${artwork.id}`;
    } else if (artwork.collectionType === 'ArtInstituteChicago') {
      destinationPath = `/collections/chicagoCollection/${artwork.id}`;
    } else {
      console.error('Unknown collection type for artwork:', artwork);
      return;
    }
  
    navigate(destinationPath, {
      state: {
        fromTemporaryExhibitions: true, // This flag tells the single artwork page where to navigate back to
      },
    });
  };

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-6">Temporary Exhibitions</h1>
      {exhibitions.length === 0 ? (
        <p>No exhibitions created yet.</p>
      ) : (
        exhibitions.map((exhibition) => (
          <section key={exhibition.id} className="mb-6 border p-4 rounded">
            <section className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{exhibition.name}</h2>
              <button
                onClick={() => removeExhibition(exhibition.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete Exhibition
              </button>
            </section>

            {exhibition.artworks.length === 0 ? (
              <p>No artworks saved to this exhibition.</p>
            ) : (
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {exhibition.artworks.map((artwork) => (
                  <section
                    key={artwork.id}
                    className="border border-solid rounded shadow p-4 cursor-pointer flex flex-col"
                  >
                    <section 
                      className="flex items-center justify-center bg-gray-50 border-solid hover:bg-gray-100 shadow h-full max-h-96"
                      onClick={() => handleArtworkClick(artwork)}
                    >
                      <LazyLoadImage
                        alt={artwork.alt || "Artwork Image"}
                        src={artwork.smallImg || artwork.img}
                        effect="blur"
                        wrapperProps={{
                          style: { transitionDelay: "1s" },
                        }}
                        className="m-2 p-2 h-full w-full max-w-96 max-h-96 object-contain"
                      />
                    </section>

                    <div className="mt-4 text-center">
                      <h2 className="text-lg font-bold">{artwork.title}</h2>
                      <p className="text-gray-600">{artwork.artist}</p>
                      <p className="text-gray-600">
                        {artwork.date < 0 ? `BC ${artwork.date * -1}` : artwork.date > 0 && artwork.date <= 999 ? `AD ${artwork.date}` : artwork.date}
                      </p>
                      <button
                        onClick={() => removeArtworkFromExhibition(exhibition.id, artwork.id)}
                        className="mt-4 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700"
                      >
                        Remove Artwork
                      </button>
                    </div>
                  </section>
                ))}
              </section>
            )}
          </section>
        ))
      )}
    </section>
  );
};

export default TemporaryExhibitions;
