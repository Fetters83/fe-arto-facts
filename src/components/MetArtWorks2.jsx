import React, { useState, useEffect } from 'react';
import ScaleLoader from "react-spinners/ClipLoader";
import { useNavigate } from 'react-router-dom';
import { fetchMetDepartments, fetchMetArtworks } from '../../api';
import { IoIosSearch } from "react-icons/io";

const MetArtWorks2 = () => {
  const [artworks, setArtworks] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [beginDateMarker,setBeginDateMarker] = useState('AD')
  const [endDateMarker,setEndDateMarker] = useState('AD')
  const [filters, setFilters] = useState({
    limit: 10,
    offset: 0,
    departmentId: 1,
    type: "",
/*     artistOrCulture:false,
    title:false,
    isHiglight:false,
    dateBegin:null,
    dateEnd:null,*/
    sortBy:'titleASC', 
    searchTerm: "",
  });
  const [filterInputs, setFilterInputs] = useState(filters); // Separate state for user input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numberOfIds, setNumberOfIds] = useState(0)

  const navigate = useNavigate();

  
  // Fetch Departments on Mount
  useEffect(() => {
    const loadDepartments = async () => {
      try {
        setError(null)
        setLoading(true);
        const departments = await fetchMetDepartments();
        setDepartments(departments);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    loadDepartments();
  }, []);

  // Fetch Artworks when Filters Change
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
    
        setLoading(true);

        window.scrollTo({
          top: 0,
          behavior: 'smooth', // Smooth scrolling (optional)
        });
        const artworks = await fetchMetArtworks(filters);
       if(artworks.artCollection.length === 0) throw error
        setNumberOfIds(artworks.length)
        setArtworks(artworks.artCollection);
        setError(null);
        setLoading(false);
      } catch (err) {

  
        setError('No results or an error has occured');
        setLoading(false);
        setArtworks([])
      }
    };
    fetchArtworks();
  }, [filters]); // Fetch only when filters are updated

  useEffect(() => {
    setFilterInputs((prev) => ({ ...prev, searchTerm: "" }));
  }, []);

  const handleFilterInputChange = (field, value) => {
    setFilterInputs((prev) => ({ ...prev, [field]: value || ""}));
   /*  setFilters(filterInputs) */
  };


  const handleApplyFilters = () => {
    setError(null)
    setFilters({ ...filterInputs, offset: 0 }); // Update filters and reset offset
  };

  const handlePagination = (direction) => {
    const newOffset = Math.max(0, filters.offset + (direction === 'next' ? filters.limit : -filters.limit));
  
    setFilters((prev) => ({
      ...prev,
      offset: newOffset,
    }));
  };
  const isNextDisabled = filters.offset + filters.limit >= numberOfIds;

  /*   if (loading) {
      return (
        <section className="h-screen flex flex-col justify-center items-center">
          <h2 className="mb-4">Please wait.....</h2>
          <ScaleLoader loading={loading} aria-label="Loading Spinner" size={150} />
        </section>
      );
    } */


  return (

    <section className='m-4 p-2'>

<section className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Explore Artworks</h1>




  <section className='flex gap-2 mb-2 h-full min-h-10   md:min-h-12 md:gap'>
  <select className='flex-grow-0  w-full max-w-20 text-sm border-2 focus:outline-none md:max-w-24'
  value={
    filterInputs.artistOrCulture
      ? 'Artist/Culture'
      : filterInputs.title
      ? 'Title'
      : 'All'
  } // Reflects current state
   onChange={(e) => {

    const selectedValue = e.target.value;

    // Remove artistOrCulture and title unless specifically selected
    const updatedFilters = { ...filterInputs };

    if (selectedValue === 'Artist/Culture') {
      updatedFilters.artistOrCulture = true;
      delete updatedFilters.title; // Ensure title is not included
    } else if (selectedValue === 'Title') {
      updatedFilters.title = true;
      delete updatedFilters.artistOrCulture; // Ensure artistOrCulture is not included
    } else {
      delete updatedFilters.artistOrCulture;
      delete updatedFilters.title;
    }

    // Update the filters state
    setFilterInputs(updatedFilters);
  


  }}>
  {['All', 'Artist/Culture', 'Title'].map((field) => (
      <option key={field} value={field}>
        {field}
      </option>
    ))}
  </select>
  <input type="text" className='flex-grow border-2 border-solid border-gray w-full max-w-21 md:max-w-17'  placeholder=" Search all fields..."
   value={filterInputs.searchTerm === "" ? "" : filterInputs.searchTerm} 
  onChange={(e)=> handleFilterInputChange('searchTerm',e.target.value)}/>
  <button className='flex-grow-0 items-center justify-center border-2 border-solid border-gray rounded focus:outline-none w-full max-w-10 md:max-w-12'
     onClick={() => {
      const isSpecialFilter =
        filterInputs.artistOrCulture || filterInputs.title;

      // Enforce searchTerm for special filters
  /*     if (isSpecialFilter && !filterInputs.searchTerm.trim()) {
        alert('Please enter a search term for Artist/Culture or Title.');
        return;
      } */

      setFilters({
        ...filterInputs,
        offset: 0,
        searchTerm: filterInputs.searchTerm.trim(),
      });

      // Reset searchTerm only if not a special filter
      if (!isSpecialFilter) {
        setFilterInputs((prev) => ({ ...prev, searchTerm: '' }));
      }
    }}>
  <IoIosSearch className='w-full'/>
  </button>
  </section>
<section className='text-center m-2 p-3 font-bold text-lg'><h2>Filters</h2></section>

  <section className="flex flex-col gap-4 mt-4 mb-6 items-center justify-center md:flex-row md:mt-4">
  {/* Filters */}
  <section className="flex flex-col gap-3 items-center justify-center md:flex-row md:gap-6">

    {/* Results */}
    <section className="flex flex-col gap-2">
      <label htmlFor="pages" className="text-sm text-center font-bold md:text-lg">Results</label>
      <select
        id="pages"
        value={filterInputs.limit}
        onChange={(e) => handleFilterInputChange('limit', parseInt(e.target.value))}
        className="border px-3 py-2 rounded mr-2"
      >
        {[10, 20, 30, 40, 50].map((limit) => (
          <option key={limit} value={limit}>
            {limit} Results per Page
          </option>
        ))}
      </select>
    </section>

    {/* Departments */}
    <section className="flex flex-col gap-2">
      <label htmlFor="department" className="text-sm text-center font-bold md:text-lg">Departments</label>
      <select
        id="department"
        value={filterInputs.departmentId}
        onChange={(e) => handleFilterInputChange('departmentId', parseInt(e.target.value))}
        className="border px-3 py-2 rounded"
      >
        {departments.map((dept) =>(
            
          <option key={dept.departmentId} value={dept.departmentId}>
            {dept.displayName}
          </option>
        ))}
      </select>
    </section>

    {/* Type/Medium */}
    <section className="flex flex-col gap-2">
      <label htmlFor="type" className="text-sm text-center font-bold md:text-lg">Type/Medium</label>
      <input
        id="type"
        type="text"
        placeholder="Type (e.g., Painting)"
        value={filterInputs.type}
        onChange={(e) => handleFilterInputChange('type', e.target.value)}
        className="border px-3 py-2 rounded flex-grow w-full md:w-auto"
      />
    </section>

    {/* Date Range */}
    <section className="flex flex-col gap-2">
      <label htmlFor="dateRange" className="text-sm text-center font-bold md:text-lg">Date Range</label>
      <section className="flex gap-2">
        {/* Start Date */}
        <section className="flex items-center border rounded-l overflow-hidden">
          <select className="border-r px-2 py-1 bg-white" 
          onChange={(e)=>{setBeginDateMarker(e.target.value)}}>
            <option value="AD">AD</option>
            <option value="BC">BC</option>
          </select>
          <input
            type="number"
            placeholder="Start Year"
            className="px-3 py-2 w-24 text-sm"
            onChange={(e)=>{
              const selectedValue = e.target.value;
              console.log(selectedValue.length)

   
    const updatedFilters = { ...filterInputs };

    if (beginDateMarker==='AD') {
      updatedFilters.dateBegin = parseInt(selectedValue,10);
    } 
    
    if (beginDateMarker === 'BC') {
      updatedFilters.dateBegin = parseInt(selectedValue * -1,10);
    } 
    if(selectedValue.length === 0) {
      delete updatedFilters.dateBegin;
      }

    // Update the filters state
    setFilterInputs(updatedFilters);
              
              }}
          />
        </section>

        {/* End Date */}
        <section className="flex items-center border rounded-r overflow-hidden">
          <select className="border-r px-2 py-1 bg-white" 
          onChange={(e)=>{setBeginDateMarker(e.target.value)}} >
            <option value="AD">AD</option>
            <option value="BC">BC</option>
          </select>
          <input
            type="number"
            placeholder="End Year"
            className="px-3 py-2 w-24 text-sm"
            onChange={(e)=>{
              const selectedValue = e.target.value;

   
    const updatedFilters = { ...filterInputs };

    if (endDateMarker==='AD') {
      updatedFilters.dateEnd = parseInt(selectedValue,10);
    } 
    if (endDateMarker === 'BC') {
      updatedFilters.dateEnd = parseInt(selectedValue * -1,10);
    } 

    if(selectedValue.length===0){
      delete updatedFilters.dateEnd
    }

    // Update the filters state
    setFilterInputs(updatedFilters);
              
              }}

          />
        </section>
      </section>
    </section>

    {/* Show Only (Checkbox) */}
    <section className="flex flex-col gap-2 items-center self-center">
      <label className="text-sm font-bold md:text-lg">Show Only</label>
      <section className="flex items-center">
        <input
          type="checkbox"
          id="highlight"
          name="Highlights"
          className="border px-2 py-2 rounded"
          onChange={
            
            (e)=>{
              const updatedFilters = { ...filterInputs };

    if (e.target.checked===true) {
      updatedFilters.isHighlight = e.target.checked;
    } 
     else{
      delete updatedFilters.isHighlight
     }

    // Update the filters state
    setFilterInputs(updatedFilters);
              
          }}
        />
        <label htmlFor="highlight" className="pl-2 text-sm md:text-base">
          Highlights
        </label>
      </section>
    </section>

  </section>

  {/* Apply Filters Button */}
  <section className="flex flex-row gap-2 pt-6 pb-0">
    <button
      onClick={handleApplyFilters}
      className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700"
    >
      Apply Filters
    </button>
  </section>
</section>

{loading && 
      <section className="flex flex-col justify-center items-center">
        <h2 className="mb-4">Please wait.....</h2>
        <ScaleLoader loading={loading} aria-label="Loading Spinner" size={150} />
      </section>
    }

       

{error && 
      <section className="flex flex-col justify-center items-center">
        <h2 className="text-red-600">No results found or an error occurred.</h2>
      </section>
    
  }
    

  


{!loading && !error &&
<>
<section className="flex items-center justify-center m-4 gap-2">
  {/* Label */}
  <label htmlFor="sort" className="text-sm">
    Sort by:
  </label>

  {/* Select Box */}
  <select
    name="sort"
    id="sort"
    className="border px-3 py-2 rounded w-auto md:w-40"
    value={
      filterInputs.sortBy === 'titleASC' ? 'Title A-Z' :
      filterInputs.sortBy === 'titleDESC' ? 'Title Z-A' :
      filterInputs.sortBy === 'dateDESC' ? 'Date (newest-oldest)' :
      filterInputs.sortBy === 'dateASC' ? 'Date (oldest-newest)' :
      filterInputs.sortBy === 'artistASC' ? 'Artist A-Z' :
      filterInputs.sortBy === 'artistDESC' ? 'Artist Z-A' :
      ''}
    onChange={(e) => {
      const selectedValue = e.target.value;
  
      // Map selected values to sortBy options
      let sortByValue = null;
      switch (selectedValue) {
        case 'Title A-Z':
          sortByValue = 'titleASC';
          break;
        case 'Title Z-A':
          sortByValue = 'titleDESC';
          break;
        case 'Date (newest-oldest)':
          sortByValue = 'dateDESC';
          break;
        case 'Date (oldest-newest)':
          sortByValue = 'dateASC';
          break;
        case 'Artist A-Z':
          sortByValue = 'artistASC';
          break;
        case 'Artist Z-A':
          sortByValue = 'artistDESC';
          break;
        default:
          sortByValue = null; // Reset if no match
      }
  
      // Update the filterInputs state
      setFilterInputs((prev) => ({
        ...prev,
        sortBy: sortByValue, // Update sortBy with the mapped value
      }));
    }}
  >
    {[
      'Title A-Z',
      'Title Z-A',
      'Date (newest-oldest)',
      'Date (oldest-newest)',
      'Artist A-Z',
      'Artist Z-A',
    ].map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
</section>


<section className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {artworks.map((artwork) => (
    <section
      key={artwork.id}
      className="border border-solid rounded shadow p-4 cursor-pointer flex flex-col"
      onClick={() => navigate(`/collections/metCollection/${artwork.id}`)}
    >
      {/* Image Section */}
      <section className="flex items-center justify-center bg-gray-50 border-solid hover:bg-gray-100 shadow h-full max-h-96">
        <img
          src={artwork.smallImg}
          alt={artwork.alt}
          loading="lazy"
          className="m-2 p-2 h-full w-full max-w-96 max-h-96 object-contain"
        />
      </section>

      {/* Title and Artist Section */}
      <div className="mt-4">
        <h2 className="text-lg font-bold">{artwork.title}</h2>
        <p className="text-gray-600">{artwork.artist}</p>
        <p className="text-gray-600">{/* artwork.numericDate<500?artwork.date:artwork.numericDate */artwork.date}</p>
      </div>
    </section>
  ))}
</section>

      <section className="flex flex-col md:flex-row justify-between mt-6 space-y-4 md:space-y-0">
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
          disabled={isNextDisabled}
          className={`px-4 py-2 rounded ${
            isNextDisabled ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-700'
          }`}
        >
          Next
        </button>
      </section>
</>
}


    </section>




    </section>
   
  );
};

export default MetArtWorks2;
