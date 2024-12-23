import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RijksArtWorks = () => {
  const [artworks, setArtworks] = useState([]);
  const [filters, setFilters] = useState({ 
    p: 1, 
    ps: 10, 
    sortQuery: 'relevance', 
    type: '', 
    searchTerm: '' 
  });

  const navigate = useNavigate();


  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get(
          'https://be-arto-facts.onrender.com/api/collections/RijksMuseum',
          { params: filters }
        );
        setArtworks(response.data.rijksArtWorks);
      } catch (error) {
        console.error('Error fetching Rijks artworks:', error);
      }
    };
    fetchArtworks();
  }, [filters]);


  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };


  const handlePagination = (direction) => {
    setFilters((prev) => ({
      ...prev,
      p: Math.max(1, prev.p + (direction === 'next' ? 1 : -1)),
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Explore Rijks Museum Artworks</h1>

  
      <div className="flex flex-wrap gap-4 mb-6 items-center justify-center">
        <select
          value={filters.ps}
          onChange={(e) => handleFilterChange('ps', parseInt(e.target.value))}
          className="border px-3 py-2 rounded"
        >
          {[10, 20, 30, 40, 50].map((limit) => (
            <option key={limit} value={limit}>
              {limit} Results per Page
            </option>
          ))}
        </select>

        <select
          value={filters.sortQuery}
          onChange={(e) => handleFilterChange('sortQuery', e.target.value)}
          className="border px-3 py-2 rounded"
        >
          {['relevance', 'objectType', 'chronologic', 'achronologic', 'artist', 'artistdesc'].map((sort) => (
            <option key={sort} value={sort}>
              {sort}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Type (e.g., Painting)"
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-auto"
        />

        <input
          type="text"
          placeholder="Search Term"
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-auto"
        />

        <button
          onClick={() => setFilters((prev) => ({ ...prev, p: 1 }))}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>

  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {artworks.map((artwork) => (
          <div
            key={artwork.id}
            className="border rounded shadow p-4 cursor-pointer"
            onClick={() => navigate(`/collections/rijksCollection/${artwork.id}`)} // Navigate to SingleArtPiece page
          >
            <img
              src={artwork.img}
              alt={artwork.alt}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-lg font-bold">{artwork.title}</h2>
            <p className="text-gray-600">{artwork.artist}</p>
          </div>
        ))}
      </div>

  
      <div className="flex flex-col md:flex-row justify-between mt-6 space-y-4 md:space-y-0">
        <button
          onClick={() => handlePagination('prev')}
          disabled={filters.p === 1}
          className={`px-4 py-2 rounded ${
            filters.p === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-700'
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

export default RijksArtWorks;
