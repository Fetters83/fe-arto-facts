import React, { useState,useEffect } from 'react';

const departments = [
    'All','African Art','American Painting and Sculpture','Art of the Americas','Chinese Art','Contemporary Art','Decorative Art and Design',
    'Drawings','Egyptian and Ancient Near Eastern Art','European Painting and Sculpture','Greek and Roman Art','Indian and South East Asian Art',
    'Islamic Art','Japanese Art','Korean Art','Medieval Art','Modern European Painting and Sculpture','Oceania','Performing Arts, Music, & Film',
    'Photography','Prints','Textiles'
  ]

  const ClevelandDepartmentsDD = ({ setFilterInputs,departmentField,setDepartmentField,departmentFieldError,setDepartmentFieldError,disabled }) => {
    const [inputValue, setInputValue] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

    useEffect(()=>{
      setInputValue(departmentField || "");
    },[departmentField])
  
    const handleInputChange = (event) => {
      const query = event.target.value;
      setDepartmentFieldError(false)
      setInputValue(query);
      setDepartmentField(query)
  
      setFilterInputs((prev) => {
        const updatedFilters = { ...prev };
        if (!query.trim()) {
          delete updatedFilters.department;
        } else {
          updatedFilters.department = query.trim();
        }
        return updatedFilters;
      });
  
     
      if (query) {
        const filtered = departments
          .filter((department) =>
            department.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 2);
        setFilteredSuggestions(filtered);
      } else {
        setFilteredSuggestions([]);
      }
    };
  
    const handleSuggestionClick = (suggestion) => {
      setInputValue(suggestion); 
      setDepartmentField(suggestion)
  
      setFilterInputs((prev) => {
        const updatedFilters = { ...prev };
        if (!suggestion.trim()) {
          delete updatedFilters.department;
        } else {
          updatedFilters.department = suggestion;
        }
        return updatedFilters;
      });
  
      setFilteredSuggestions([]); 
    };
  
    return (
      <section className="relative flex flex-col items-center w-full md:w-auto">
          <label
                htmlFor="department"
                className="text-sm font-bold mb-1 text-center"
              >
                Departments
              </label> 
        <input
          type="text"
          value={inputValue} 
          onChange={handleInputChange}
          placeholder="Search by department.."
          className={`w-full p-2 border border-gray-300 rounded h-10 text-sm ${departmentFieldError? "border-red-500" : "border-gray-300"}`}
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
         {departmentFieldError && <p className="text-red-500 text-xs mt-1">Numbers are not allowed</p>}
      </section>
    );
  };
  
  export default ClevelandDepartmentsDD;
  