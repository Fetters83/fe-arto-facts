import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function ArtCollections() {
  const [collections, setCollections] = useState([]);
  const [filters, setFilters] = useState({ search: '', department: '' });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCollections() {
      const response = await axios.get('/api/art-collections/public', { params: filters });
      setCollections(response.data);
    }
    fetchCollections();
  }, [filters]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Explore Art Collections</h1>

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search collections..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="border px-3 py-2 rounded w-full"
        />
        <select
          value={filters.department}
          onChange={(e) => setFilters({ ...filters, department: e.target.value })}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Departments</option>
          <option value="Painting">Painting</option>
          <option value="Sculpture">Sculpture</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="border rounded shadow hover:shadow-lg transition p-4"
            onClick={() => navigate(`/collections/${collection.id}`)}
          >
            <img src={collection.thumbnail} alt={collection.title} className="w-full h-48 object-cover mb-2" />
            <h2 className="text-lg font-semibold">{collection.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtCollections;
