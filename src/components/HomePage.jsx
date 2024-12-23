import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Arto Facts</h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-700"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/signup')}
          className="bg-green-500 text-white px-6 py-3 rounded shadow hover:bg-green-700"
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default HomePage;