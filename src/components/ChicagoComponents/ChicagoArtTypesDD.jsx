import React, { useEffect, useState } from 'react';
import { fetchChicagoArtTypes } from '../../../api';



const ChicagoArtTypes = ({ setFilterInputs,artTypeTitleFieldError,setArtTypeTitleFieldError,artTypeField,setArtTypeField,disabled }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [types, setTypes] = useState([])

  useEffect(()=>{
    const getChicagoArtTypes = async()=>{

      try {
        const chicagoArtTypesData = await fetchChicagoArtTypes()

        setTypes(chicagoArtTypesData)
      } catch (error) {
        throw error
      }
    }
    getChicagoArtTypes()
  },[])
  const handleInputChange = (event) => {
    const query = event.target.value;
    setArtTypeTitleFieldError(false)
    setInputValue(query);
    setArtTypeField(query)

    setFilterInputs((prev) => {
      const updatedFilters = { ...prev };
      if (!query.trim()) {
        delete updatedFilters.artTypeTitle;
      } else {
        updatedFilters.artTypeTitle = query.trim();
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
      artTypeTitle: suggestion,
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
    
        className={`border px-3 py-2 rounded w-full h-10 md:w-auto text-sm 
          ${artTypeTitleFieldError ? "border-red-500" : "border-gray-300"}`}
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
      {artTypeTitleFieldError && <p className="text-red-500 text-xs mt-1">Numbers are not allowed</p>}
    </section>
  );
};

export default ChicagoArtTypes;
