import React, { useState, useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const MobileMenu = ({ setMobileMenuClicked }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setMobileMenuClicked(false);
  };

  const handleExploreClick = (path) => {
    navigate(path);
    setMobileMenuClicked(false);
  };

  // ✅ Disable scrolling when menu is open
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scroll
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scroll when menu closes
    };
  }, []);

  return (
    <section
      className="bg-blue-100 shadow-lg p-6 fixed top-0 left-0 w-full h-screen 
                 transform translate-y-0 transition-transform duration-500 ease-in border-t-4 border-blue-100 z-50"
    >
      <section>
        <button onClick={handleClick} className="text-black text-lg font-bold">
          <IoIosCloseCircleOutline className="text-4xl" />
        </button>
      </section>

      <section className="flex flex-col items-left justify-center space-y-4 mt-10">
        <a
          href="#"
          className="text-black font-normal hover:font-bold"
          onClick={() => handleExploreClick("/")}
        >
          Home
        </a>

        <section className="relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="text-black font-normal hover:font-bold flex items-center"
          >
            Explore Artworks
            <ChevronDownIcon className="ml-2 w-4 h-4" />
          </button>
          {isDropdownOpen && (
            <section className="absolute bg-white shadow-lg rounded-md mt-2 w-56 z-10">
              <section className="py-2">
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:font-bold w-full text-left"
                  onClick={() => handleExploreClick("/collections/chicagoCollection")}
                >
                  Art Institute of Chicago
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:font-bold w-full text-left"
                  onClick={() => handleExploreClick("/collections/clevelandCollection")}
                >
                  Cleveland Museum of Art
                </button>
              </section>
            </section>
          )}
        </section>

        <Link
          to={"/exhibitions"}
          className="text-black font-normal hover:font-bold"
          onClick={handleClick}
        >
          Temporary Exhibitions
        </Link>
      </section>
    </section>
  );
};

export default MobileMenu;
