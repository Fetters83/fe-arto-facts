import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";


import { useArtContext } from "../contexts/ArtworkContext.jsx";
import { fetchChicagoArtworkById } from "../../api.js";
import DOMPurify from 'dompurify';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ChicagoSingleArtPiece = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [artwork, setArtwork] = useState(null);
  const [error, setError] = useState("");
  const { exhibitions, addArtworkToExhibition, createExhibition } =
    useArtContext();
  const [selectedExhibitionId, setSelectedExhibitionId] = useState("");
  const [newExhibitionName, setNewExhibitionName] = useState("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const loadArtwork = async () => {
      try {
        const data = await fetchChicagoArtworkById(id);
        setArtwork(data);
      } catch (err) {
        console.error(err);
        setError("Could not fetch the artwork details.");
      }
    };
    loadArtwork();
  }, [id]);


  const handleSaveArtwork = () => {
    const artworkWithCollectionType = {
      ...artwork,
      collectionType: "ArtInstituteChicago",
    };
  
    if (selectedExhibitionId) {
      // If an exhibition is selected, add artwork directly
      addArtworkToExhibition(selectedExhibitionId, artworkWithCollectionType);
      alert(`Artwork saved to the exhibition!`);
    } else if (newExhibitionName.trim()) {
      // If creating a new exhibition, ensure message order is correct
      const newId = Date.now();
      createExhibition(newExhibitionName);
  
      setTimeout(() => {
        addArtworkToExhibition(newId, artworkWithCollectionType);
        alert(`Artwork saved to new exhibition "${newExhibitionName}"!`);
        setNewExhibitionName("");
      }, 0);
    } else {
      // **Only show this if no new name or existing selection exists**
      alert("Please select or create an exhibition.");
    }
  };

  const previousPage = location.state?.fromTemporaryExhibitions ? '/exhibitions' : '/collections/chicagoCollection';

  if (error) {
    return <section className="p-6 text-red-500">{error}</section>;
  }

  if (!artwork) {
    return <section className="p-6 text-center">Loading...</section>;
  }

  return (
    <section className="p-6">
      <button
        onClick={() =>
          navigate(previousPage, { state: location.state })
        }
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
      >
        Back
      </button>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {!imageError ? (
          <LazyLoadImage
          alt={artwork.alt}
          src={artwork.img || artwork.smallIng}
          effect="blur"
          wrapperProps={{
            style: { transitionDelay: "1s" },
          }}
          className="w-full h-auto object-cover rounded shadow"
          onError={() => setImageError(true)}
          />
        ) : (
          <a
            href="https://www.artic.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-auto flex items-center justify-center text-blue-500 text-lg underline bg-gray-200 p-4 rounded shadow text-center"
          >
            No Image Available - Click to Visit Art Institute of Chicago
          </a>
        )}
        <section>
          <h1 className="text-2xl font-bold mb-4">{artwork.title}</h1>
          <p className="text-gray-600">
            <strong>Artist:</strong> {artwork.artist}
          </p>
          <p className="text-gray-600">
            <strong>Date:</strong>{" "}
            {artwork.date < 0
              ? `BC ${artwork.date * -1}`
              : artwork.date > 0 && artwork.date <= 999
              ? `AD ${artwork.date}`
              : artwork.date}
          </p>
          <p className="text-gray-600">
            <strong>Medium:</strong> {artwork.medium.join(", ")}
          </p>
          <p className="text-gray-600">
            <strong>Classification:</strong> {artwork.classification}
          </p>
          <p className="text-gray-600">
            <strong>Department:</strong> {artwork.department}
          </p>
          <p className="text-gray-600">
            <strong>Country:</strong> {artwork.country}
          </p>
          <p className="text-gray-600">
            <strong>Credited to:</strong> {artwork.creditedTo}
          </p>
          <p className="text-gray-600">
            <strong>Description:</strong>{" "}
            {artwork.description ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(artwork.description),
                }}
              />
            ) : (
              "No description available"
            )}
          </p>

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
      </section>
    </section>
  );
};

export default ChicagoSingleArtPiece;
