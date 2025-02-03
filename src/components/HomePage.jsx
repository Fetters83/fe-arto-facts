import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const images = [
    "/images/Carl_Blechen.jpg",
    "/images/Hokusai.jpg",
    "/images/Lotto.jpg",
    "/images/Mcleay.jpg",
    "/images/Pablo_Picasso.jpg",
    "/images/shitao.jpg",
  ];

  return (
    <section className="flex flex-col items-center justify-center p-6">
       <section className="grid grid-cols-3 gap-2 md:gap-4 w-full max-w-4xl">
        {images.map((img, index) => (
          <section key={index} className="relative group">
            <img
              src={img}
              alt={`Artwork ${index + 1}`}
              className="object-cover w-full h-40 md:h-56 rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-105"
            />
          </section>
        ))}
      </section>

           <section className="text-center mt-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Welcome to <span className="text-blue-600">Arto Facts</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-lg">
          Discover the rich history of art from the **Art Institute of Chicago** and the **Cleveland Museum of Art**. Explore collections, save artworks, and create your own exhibitions!
        </p>
      </section>

      {/* CTA Buttons */}
      <section className="mt-6 flex gap-4">
        <button
          onClick={() => navigate("/collections/chicagoCollection")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
        >
          Explore Chicago Art
        </button>
        <button
          onClick={() => navigate("/collections/clevelandCollection")}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
        >
          Explore Cleveland Art
        </button>
      </section>
    </section>
  );
};

export default Home;