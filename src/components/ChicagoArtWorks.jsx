import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchChicagoArtworks } from '../../api';

const ChicagoArtWorks = () => {
  const [artworks, setArtworks] = useState([]);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    placeOfOrigin: '',
    artistName: '',
    artTypeTitle: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadArtworks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchChicagoArtworks(filters);
        setArtworks(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch artworks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadArtworks();
  }, [filters]);

 

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };


  const handlePagination = (direction) => {
    setFilters((prev) => ({
      ...prev,
      page: Math.max(1, prev.page + (direction === 'next' ? 1 : -1)),
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Explore Art Institute of Chicago Artworks</h1>

   
      <div className="flex flex-wrap gap-4 mb-6 items-center justify-center">
     
        <select
          value={filters.limit}
          onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
          className="border px-3 py-2 rounded"
        >
          {[10, 20, 30, 40, 50].map((limit) => (
            <option key={limit} value={limit}>
              {limit} Results per Page
            </option>
          ))}
        </select>

        
        <input
          type="text"
          placeholder="Place of Origin"
          value={filters.placeOfOrigin}
          onChange={(e) => handleFilterChange('placeOfOrigin', e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-auto"
        />

       
        <input
          type="text"
          placeholder="Artist Name"
          value={filters.artistName}
          onChange={(e) => handleFilterChange('artistName', e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-auto"
        />

       
        <input
          type="text"
          placeholder="Art Type Title"
          value={filters.artTypeTitle}
          onChange={(e) => handleFilterChange('artTypeTitle', e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-auto"
        />

     
        <button
          onClick={() => setFilters((prev) => ({ ...prev, page: 1 }))}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>

    
      {loading && <p className="text-center text-gray-600">Loading artworks...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {artworks.length === 0 && !loading && !error && (
          <p className="text-gray-600 col-span-full text-center">
            No artworks found. Try adjusting the filters.
          </p>
        )}
        {artworks.map((artwork) => (
          <div
            key={artwork.id}
            className="border rounded shadow p-4 cursor-pointer hover:shadow-lg"
            onClick={() => navigate(`/collections/chicagoCollection/${artwork.id}`)} // Navigate to SingleArtPiece page
          >
            <img
              src={artwork.img}
              alt={artwork.alt}
              className="w-full h-48 object-cover rounded-t"
            />
            <h2 className="text-lg font-bold">{artwork.title}</h2>
            <p className="text-gray-600">{artwork.artist}</p>
          </div>
        ))}
      </div>

     
      <div className="flex flex-col md:flex-row justify-between mt-6 space-y-4 md:space-y-0">
        <button
          onClick={() => handlePagination('prev')}
          disabled={filters.page === 1}
          className={`px-4 py-2 rounded ${
            filters.page === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-700'
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => handlePagination('next')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ChicagoArtWorks;
