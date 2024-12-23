import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyExhibitions() {
  const [collections, setCollections] = useState([]);
  const [newCollection, setNewCollection] = useState({ title: '', description: '', isPublic: false });

  useEffect(() => {
    async function fetchMyCollections() {
      const response = await axios.get('/api/art-collections/my');
      setCollections(response.data);
    }
    fetchMyCollections();
  }, []);

  async function handleCreateCollection() {
    await axios.post('/api/art-collections', newCollection);
    setNewCollection({ title: '', description: '', isPublic: false });
    fetchMyCollections();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Exhibitions</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Collection Title"
          value={newCollection.title}
          onChange={(e) => setNewCollection({ ...newCollection, title: e.target.value })}
          className="border px-3 py-2 rounded w-full mb-2"
        />
        <textarea
          placeholder="Collection Description"
          value={newCollection.description}
          onChange={(e) => setNewCollection({ ...newCollection, description: e.target.value })}
          className="border px-3 py-2 rounded w-full mb-2"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={newCollection.isPublic}
            onChange={(e) => setNewCollection({ ...newCollection, isPublic: e.target.checked })}
          />
          <span>Make this collection public</span>
        </label>
        <button
          onClick={handleCreateCollection}
          className="bg-blue-500 text-white px-6 py-2 rounded mt-2 hover:bg-blue-700"
        >
          Create Collection
        </button>
      </div>

      <h2 className="text-xl font-bold mb-4">Your Collections</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((collection) => (
          <div key={collection.id} className="border rounded shadow p-4">
            <h3 className="text-lg font-semibold">{collection.title}</h3>
            <p>{collection.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyExhibitions;