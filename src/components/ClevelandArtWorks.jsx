import React, { useState, useEffect } from "react";
import ScaleLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import { fetchClevelandArtworks } from "../../api";
import ClevelandDepartmentsDD from "./ClevelandComponents/ClevelandDepartmentsDD";
import ClevelandArtTypes from "./ClevelandComponents/ClevelandArtTypesDD";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import ReactPaginate from "react-paginate";
import ClevelandResultsPerPageDD from "./ClevelandComponents/ClevelandResultPerPageDD";
import ClevelandDateRangeDD from "./ClevelandComponents/ClevelandDateRangeDD";
import ClevelandCultureFields from "./ClevelandComponents/ClevelandCultureField";
import ClevelandSortDD from "./ClevelandComponents/ClevelandSortDD";
import ClevelandQueryField from "./ClevelandComponents/ClevelandQueryField";
import { HiChevronDown } from "react-icons/hi";
import { HiChevronUp } from "react-icons/hi";


const ClevelandArtWorks = () => {
  const [artworks, setArtworks] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [beginDateMarker, setBeginDateMarker] = useState("AD");
  const [endDateMarker, setEndDateMarker] = useState("AD");
  const [filters, setFilters] = useState({
    offset: 0,
  });
  const [filterInputs, setFilterInputs] = useState(filters); // Separate state for user input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentItems, setCurrentItems] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const [filtersActive, setFiltersActive] = useState(false)

  const navigate = useNavigate();


console.log(filters)
  // Fetch Artworks when Filters Change
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true);
        window.scrollTo({
          top: 0,
          behavior: "smooth", 
        });
        const artworksData = await fetchClevelandArtworks(filters);
        if (artworksData.length === 0) throw error;
        setArtworks(artworksData);
        setError(null);
      } catch (err) {
        setError("No results or an error occurred");
        setArtworks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArtworks();
  }, [filters]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(artworks.slice(itemOffset, endOffset));
  }, [artworks, itemOffset, itemsPerPage]);

  const handleFilterInputChange = (field, value) => {
    const updatedFilters = { ...filterInputs };
    if (updatedFilters.field && (value.length === 0 || value === "")) {
      delete updatedFilters.field;
      setFilterInputs(updatedFilters);
    } else {
      setFilterInputs((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleApplyFilters = () => {
    setError(null);
    setItemOffset(0); 
    setSelectedPage(0); 
    /* setFilters((prev) => ({ ...prev, offset: 0 })); */
    setFilters(()=>({...filterInputs,offset:0}))
  };

  const pageCount = Math.ceil(artworks.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    window.scrollTo({
      top: 0,
      behavior: "instant", 
    });
    const newOffset = (event.selected * itemsPerPage) % artworks.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    setSelectedPage(event.selected);
  };

  const handleActivateFilters = ()=>{
    if(filtersActive){setFiltersActive(false)} else{
      setFiltersActive(true)
    }
  }

  return (
    <section className="m-4 p-2">
      <section className="p-4">
        <h3 className="text-lg font-bold mb-4 text-center">
          Explore Cleveland Art Museum Artworks
        </h3>

        <section className="flex gap-2 mb-2 h-full min-h-10   md:min-h-12 md:gap">
          <ClevelandQueryField
            filterInputs={filterInputs}
            handleFilterInputChange={handleFilterInputChange}
            setFilterInputs={setFilterInputs}
            setItemOffset={setItemOffset}
            setSelectedPage={setSelectedPage}
            handlePageClick={handlePageClick}
            handleApplyFilters={handleApplyFilters}
          />
        </section>
        <section className="border-2 border-solid border-slate-500 rounded">
        <section className="flex flex-row justify-center items-center text-center m-2 p-3 font-bold text-lg gap-2">
          <h2>Filters</h2>
          <button onClick={handleActivateFilters}className="pl-2 ">{filtersActive? <HiChevronDown />:<HiChevronUp />}</button>
        </section>
        
        {filtersActive &&
          <section className="flex flex-col gap-4 mt-4 mb-6 items-center justify-center md:flex-row md:mt-4">
          <section className="flex flex-col gap-3 items-center justify-center md:flex-row md:gap-6">
           <section className="flex flex-col gap-2">
           
            <ClevelandDepartmentsDD
              setDepartments={setDepartments}
              filterInputs={filterInputs}
              setFilterInputs={setFilterInputs}
              handleFilterInputChange={handleFilterInputChange}
            />
          </section>
          <section className="flex flex-col gap-2">
          
            <ClevelandArtTypes
              filterInputs={filterInputs}
              setFilterInputs={setFilterInputs}
            />
          </section>
          <section className="flex flex-col gap-2">
            <ClevelandDateRangeDD
              filterInputs={filterInputs}
              setFilterInputs={setFilterInputs}
              beginDateMarker={beginDateMarker}
              setBeginDateMarker={setBeginDateMarker}
              endDateMarker={endDateMarker}
              setEndDateMarker={setEndDateMarker}
            />
          </section>
          <section className="flex flex-col gap-2 ">
            <ClevelandCultureFields
              filterInputs={filterInputs}
              setFilterInputs={setFilterInputs}
            />
          </section>
        </section>
        <section className="flex flex-row gap-2 pt-6 pb-0">
          <button
            onClick={handleApplyFilters}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </section>
      </section>
        }
        </section>
     
       
      

        {loading && (
          <section className="flex flex-col justify-center items-center">
            <h2 className="mb-4">Please wait.....</h2>
            <ScaleLoader
              loading={loading}
              aria-label="Loading Spinner"
              size={150}
            />
          </section>
        )}

        {error && (
          <section className="flex flex-col justify-center items-center">
            <h2 className="text-red-600">
              No results found.....
            </h2>
          </section>
        )}

        {!loading && !error && (
          <>
            <section className="flex flex-wrap gap-4 justify-between py-4 md:flex-nowrap md:justify-center w-full">

                 <ClevelandResultsPerPageDD
                filterInputs={filterInputs}
                setItemsPerPage={setItemsPerPage}
              />
       
              <ClevelandSortDD
                filterInputs={filterInputs}
                setFilterInputs={setFilterInputs}
              />
              
            </section>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentItems.map((item) => (
                <section
                  key={item.id}
                  className="border border-solid rounded shadow p-4 cursor-pointer flex flex-col"
                  onClick={() =>
                    navigate(`/collections/metCollection/${item.id}`)
                  }
                >
                  <section className="flex items-center justify-center bg-gray-50 border-solid hover:bg-gray-100 shadow h-full max-h-96">
                      <LazyLoadImage
                      alt={item.alt}
                      src={item.img}
                      effect="blur"
                      wrapperProps={{
                        // If you need to, you can tweak the effect transition using the wrapper style.
                        style: {transitionDelay: "1s"}}}
                      className="m-2 p-2 h-full w-full max-w-96 max-h-96 object-contain"/>
                  </section>

                  <div className="mt-4">
                    <h2 className="text-lg font-bold">{item.title}</h2>
                    <p className="text-gray-600">{item.artist}</p>
                    <p className="text-gray-600">{item.date}</p>
                  </div>
                </section>
              ))}
            </section>
          </>
        )}
      </section>
       {!loading && !error && 
        <section id="container" className="flex justify-center my-4 overflow-x-auto">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2} 
          marginPagesDisplayed={1} 
          pageCount={pageCount}
          forcePage={selectedPage}
          renderOnZeroPageCount={null}
          containerClassName="flex space-x-1 md:space-x-2 bg-gray-100 p-2 rounded-md shadow-md overflow-x-auto"
          pageClassName="px-2 py-1 md:px-3 md:py-2 border border-gray-300 rounded-md bg-white hover:bg-blue-500 hover:text-white transition duration-300 text-sm md:text-base"
          activeClassName="bg-blue-600 text-white"
          breakClassName="px-2 py-1 text-sm md:text-base"
          previousClassName="px-3 py-1 md:px-4 md:py-2 border border-gray-300 rounded-md bg-white hover:bg-blue-500 hover:text-white transition duration-300 text-sm md:text-base"
          nextClassName="px-3 py-1 md:px-4 md:py-2 border border-gray-300 rounded-md bg-white hover:bg-blue-500 hover:text-white transition duration-300 text-sm md:text-base"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </section>}
     
    </section>
  );
};

export default ClevelandArtWorks;
