import React, { useState } from 'react';

const types = [
    'Amulets','Apparatus','Arms and Armor',
    'Basketry',	'Book Binding',	'Bound Volume',
    'Calligraphy',	'Carpet',	'Ceramic',
    'Coins','Cosmetic Objects',	'Drawing',
    'Embroidery','Enamel','Forgery','Frame',
    'Funerary Equipment','Furniture and woodwork',
    'Garment','Glass','Glyptic','Illumination',
    'Implements','Inlays', 'Ivory','Jade','Jewelry',
    'Knitting','Lace','Lacquer','Leather','Linoleum Block',
    'Lithographic Stone', 'Manuscript','Metalwork','Miniature',
    'Miscellaneous','Mixed Media','Monotype','Mosaic',
    'Musical Instrument','Netsuke','Painting','Papyri','Photograph',
    'Plaque','Plate','Portfolio', 'Portrait Miniature','Print',
    'Relief','Rock crystal','Rubbing','Sampler','Scarabs',
    'Sculpture','Seals','Silver','Spindle Whorl','Stencil',
    'Stone','Tapestry','Textile',,'Time-based Media','Tool',
    'Velvet','Vessels','Wood','Woodblock'
];

const ClevelandArtTypes = ({ setFilterInputs,artTypeField,setArtTypeField,artTypeFieldError,setArtTypeFieldError,disabled }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setArtTypeFieldError(false)
    setInputValue(query);
    setArtTypeField(query)

    setFilterInputs((prev) => {
      const updatedFilters = { ...prev };
      if (!query.trim()) {
        delete updatedFilters.type;
      } else {
        updatedFilters.type = query.trim();
      }
      return updatedFilters;
    });

    
    if (query) {
      const filtered = types
        .filter((type) =>
          type.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 2);
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setArtTypeField(suggestion)
    setFilterInputs((prev) => ({
      ...prev,
      type: suggestion,
    }));
    setFilteredSuggestions([]);
  };

  return (
    <section className="relative flex flex-col items-center w-full md:w-auto">
        <label
                htmlFor="type"
                className="text-sm font-bold mb-1 text-center"
              >
                Type/Medium
              </label> 
      <input
        type="text"
                value={artTypeField? artTypeField: ''}
        onChange={handleInputChange}
        placeholder="Search by medium.."
    
        className={`w-full p-2 border border-gray-300 rounded h-10 text-sm ${artTypeFieldError ? "border-red-500" : "border-gray-300"}`}
        disabled={disabled}
     />
      {filteredSuggestions.length > 0 && (
        <ul

         className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-300 rounded shadow-md z-10"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
   
             className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {artTypeFieldError && <p className="text-red-500 text-xs mt-1">Numbers are not allowed</p>}
    </section>
  );
};

export default ClevelandArtTypes;
