import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom'; 
import { fetchMetDepartments, fetchMetArtworks } from '../../api';

const MetArtWorks = () => {
  const [artworks, setArtworks] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filters, setFilters] = useState({
    limit: 10,
    offset: 0,
    departmentId: 1,
    type: '',
    searchTerm: 'Painting',
  });

  const navigate = useNavigate(); 

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const data = await fetchMetDepartments(); 
        setDepartments(data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };
    loadDepartments();
  }, []);

 
  useEffect(() => {
    const loadArtworks = async () => {
      try {
        const data = await fetchMetArtworks(filters); 
        setArtworks(data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
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
      offset: Math.max(0, prev.offset + (direction === 'next' ? filters.limit : -filters.limit)),
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Explore Artworks</h1>

    
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

        <select
          value={filters.departmentId}
          onChange={(e) =>
            handleFilterChange('departmentId', parseInt(e.target.value))
          }
          className="border px-3 py-2 rounded"
        >
          {departments.map((dept) => (
            <option key={dept.departmentId} value={dept.departmentId}>
              {dept.displayName}
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
          onClick={() => setFilters((prev) => ({ ...prev, offset: 0 }))}
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
            onClick={() => navigate(`/collections/metCollection/${artwork.id}`)} // Navigate to SingleArtWork
          >
            <img
              src={artwork.smallImg}
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
          disabled={filters.offset === 0}
          className={`px-4 py-2 rounded ${
            filters.offset === 0 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-700'
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

export default MetArtWorks;
