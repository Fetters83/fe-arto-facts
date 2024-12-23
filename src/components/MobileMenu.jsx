import React, { useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';

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

  return (
    <section
      className="bg-blue-100 shadow-lg p-6 fixed bottom-0 left-0 w-full h-[70vh] 
                 transform translate-y-0 transition-transform duration-2000 ease-in border-t-4 border-blue-100"
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
          onClick={() => handleExploreClick('/')}
        >
          Home
        </a>

     
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="text-black font-normal hover:font-bold flex items-center"
          >
            Explore Artworks
            <ChevronDownIcon className="ml-2 w-4 h-4" />
          </button>
          {isDropdownOpen && (
            <div className="absolute bg-white shadow-lg rounded-md mt-2 w-56 z-10">
              <div className="py-2">
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:font-bold w-full text-left"
                  onClick={() => handleExploreClick('/collections/metCollection')}
                >
                  Metropolitan Museum of Art NY
                </button>
                   <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:font-bold w-full text-left"
                  onClick={() => handleExploreClick('/collections/chicagoCollection')}
                >
                  Art Institute of Chicago
                </button>
              </div>
            </div>
          )}
        </div>

        <a
          href="#"
          className="text-black font-normal hover:font-bold"
          onClick={() => handleExploreClick('/exhibitions')}
        >
          Temporary Exhibitions
        </a>

      </section>
    </section>
  );
};

export default MobileMenu;
