import React, { useState, useEffect } from "react";
import ScaleLoader from "react-spinners/ClipLoader";
import { useNavigate,useLocation } from "react-router-dom";
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
  const [error, setError] = useState(null);
  const location = useLocation();
  const [currentItems, setCurrentItems] = useState(location.state?.currentItems ||[]);
  const [filters, setFilters] = useState(location.state?.filters || {
   
  });
  const [filterInputs, setFilterInputs] = useState(filters); // Separate state for user input
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(location.state?.itemsPerPage || 12);
  const [itemOffset, setItemOffset] = useState(location.state?.itemOffset || 0);
  const [selectedPage, setSelectedPage] = useState(location.state?.selectedPage || 0);
  const [filtersActive, setFiltersActive] = useState(location.state?.filtersActive || false)
  const [queryField, setQueryField] = useState(location.state?.queryField || null)
  const [departmentField, setDepartmentField] = useState(location.state?.departmentField || null)
  const [artTypeField, setArtTypeField] = useState(location.state?.artTypeField || null)
  const [beginDateMarker, setBeginDateMarker] = useState(location.state?.beginDateMarker ||"AD");
  const [dateFrom, setDateFrom] = useState(location.state?.dateFrom || '')
  const [endDateMarker, setEndDateMarker] = useState(location.state?.endDateMarker ||"AD");
  const [dateTo,setDateTo] = useState(location.state?.dateTo || '')
  const [cultureField, setCultureField] = useState(location.state?.cultureField || null )
  const [sortFilter,setSortFilter] = useState(location.state?.sortFilter || 'Title A-Z')
  const [queryFieldError, setQueryFieldError] = useState(false);
  const [departmentFieldError, setDepartmentFieldError] = useState(false);
  const [artTypeFieldError, setArtTypeFieldError] = useState(false);
  const [cultureFieldError, setCultureFieldError] = useState(false);
  const [beginDateFieldError,setBeginDateFieldError] = useState(false)
  const navigate = useNavigate();

  
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
  }, [filters,itemsPerPage]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(artworks.slice(itemOffset, endOffset));
  }, [artworks, itemOffset, itemsPerPage]);


  useEffect(() => {
    if (location.state) {
      setSelectedPage(location.state.selectedPage || 0);
      setItemOffset(location.state.itemOffset || 0);
      setItemsPerPage(location.state.itemsPerPage || 12);
      setFilters(location.state.filters || {});
      setSortFilter(location.state.sortFilter || 'Title A-Z'); 
      setCurrentItems(location.state.currentItems || []);
      setDepartmentField(location.state.departmentField || null)
      setBeginDateMarker(location.state.beginDateMarker || 'AD')
      setEndDateMarker(location.state.endDateMarker || 'AD')
      setArtTypeField(location.state.artTypeField || null)
      setDateTo(location.state.dateTo || null)
      setDateFrom(location.state.dateFrom || null)
      setCultureField(location.state.cultureField || null)
      setQueryField(location.state.queryField || null)
      setFiltersActive(location.state?.filtersActive || false)

    }
  }, [location.state]);


  const handleApplyFilters = () => {
    setError(null);
    setItemOffset(0); 
    setSelectedPage(0); 
    

    if (/\d/.test(filterInputs.q)) {
      setQueryFieldError(true); // Set error if numbers are found
      return;
    }

    if (/\d/.test(filterInputs.culture)) {
      setCultureFieldError(true); // Set error if numbers are found
      return;
    }

    if (/\d/.test(filterInputs.department)) {
      setDepartmentFieldError(true); // Set error if numbers are found
      return;
    }

    if (/\d/.test(filterInputs.type)) {
      setArtTypeFieldError(true); // Set error if numbers are found
      return;
    }

    if(filterInputs.created_after > filterInputs.created_before) {
      setBeginDateFieldError(true);
      return;
    }



    setFilters(()=>({...filterInputs}))
  };

  const pageCount = Math.ceil(artworks.length / itemsPerPage);

  const handleClearFilters = ()=>{
    setFilterInputs(()=>({}))
    setFilters(()=>({}))
    setArtTypeField('')
    setDepartmentField('')
    setBeginDateMarker('AD')
    setDateFrom('')
    setEndDateMarker('AD')
    setDateTo('')
    setCultureField('')
    setQueryField('')
    setItemsPerPage(12)
    navigate(`/collections/clevelandCollection`, { replace: true, state: null });
  }
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    window.scrollTo({
      top: 0,
      behavior: "instant", 
    });
    const newOffset = (event.selected * itemsPerPage) % artworks.length;
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
          Explore Cleveland Museum of Art Artworks
        </h3>

        <section className="flex gap-2 mb-2 h-full min-h-10   md:min-h-12 md:gap">
          <ClevelandQueryField
            setFilterInputs={setFilterInputs}
            setItemOffset={setItemOffset}
            setSelectedPage={setSelectedPage}
            handleApplyFilters={handleApplyFilters}
            queryField={queryField}
            setQueryField={setQueryField}
            queryFieldError={queryFieldError}
            setQueryFieldError={setQueryFieldError}
            disabled={loading}
          />
        </section>
        {queryFieldError && (
          <section className="">
            <p className="m-2 text-red-500 text-xs mt-1">
              Numbers are not allowed
            </p>
          </section>
        )}
        <section className="border-2 border-solid border-slate-500 rounded">
          <section className="flex flex-row justify-center items-center text-center m-2 p-3 font-bold text-lg gap-2">
            <h2>Filters</h2>
            <button onClick={handleActivateFilters} className="pl-2 ">
              {filtersActive ? <HiChevronDown /> : <HiChevronUp />}
            </button>
          </section>

          {filtersActive && (
            <section className="flex flex-col gap-4 mt-4 mb-6 items-center justify-center md:flex-row md:mt-4">
              <section className="flex flex-col gap-3 items-center justify-center md:flex-row md:gap-6">
                <section className="flex flex-col gap-2">
                  <ClevelandDepartmentsDD
                    setFilterInputs={setFilterInputs}
                    departmentField={departmentField}
                    setDepartmentField={setDepartmentField}
                    departmentFieldError={departmentFieldError}
                    setDepartmentFieldError={setDepartmentFieldError}
                    disabled={loading}
                  />
                </section>
                <section className="flex flex-col gap-2">
                  <ClevelandArtTypes
                    setFilterInputs={setFilterInputs}
                    artTypeField={artTypeField}
                    setArtTypeField={setArtTypeField}
                    artTypeFieldError={artTypeFieldError}
                    setArtTypeFieldError={setArtTypeFieldError}
                    disabled={loading}
                  />
                </section>
                <section className="flex flex-col gap-2">
                  <ClevelandDateRangeDD
                    setFilterInputs={setFilterInputs}
                    beginDateMarker={beginDateMarker}
                    setBeginDateMarker={setBeginDateMarker}
                    endDateMarker={endDateMarker}
                    setEndDateMarker={setEndDateMarker}
                    dateFrom={dateFrom}
                    setDateFrom={setDateFrom}
                    dateTo={dateTo}
                    setDateTo={setDateTo}
                    beginDateFieldError={beginDateFieldError}
                    setBeginDateFieldError={setBeginDateFieldError}
                    disabled={loading}
                  />
                </section>
                <section className="flex flex-col gap-2 ">
                  <ClevelandCultureFields
                    setFilterInputs={setFilterInputs}
                    cultureField={cultureField}
                    setCultureField={setCultureField}
                    cultureFieldError={cultureFieldError}
                    setCultureFieldError={setCultureFieldError}
                    disabled={loading}
                  />
                </section>
              </section>
              <section className="flex flex-row gap-2 pt-6 pb-0">
                <button
                  onClick={handleApplyFilters}
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700"
                  disabled={loading}
                >
                  Apply Filters
                </button>
                <button
                  onClick={handleClearFilters}
                  className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700"
                  disabled={loading}
                >
                  Clear Filters
                </button>
              </section>
            </section>
          )}
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
            <h2 className="text-red-600">No results found.....</h2>
          </section>
        )}

        {!loading && !error && (
          <>
            <section className="flex flex-wrap gap-4 justify-between py-4 md:flex-nowrap md:justify-center w-full">
              <ClevelandResultsPerPageDD
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
              />

              <ClevelandSortDD
                setFilters={setFilters}
                sortFilter={sortFilter}
                setSortFilter={setSortFilter}
              />
            </section>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentItems.map((item) => (
                <section
                  key={item.id}
                  className="border border-solid rounded shadow p-4 cursor-pointer flex flex-col"
                  onClick={() =>
                    navigate(`/collections/clevelandCollection/${item.id}`, {
                      state: {
                        selectedPage,
                        itemOffset,
                        itemsPerPage,
                        filters,
                        currentItems,
                        departmentField,
                        beginDateMarker,
                        endDateMarker,
                        artTypeField,
                        dateTo,
                        dateFrom,
                        cultureField,
                        queryField,
                        filtersActive,
                        sortFilter,
                      },
                    })
                  }
                >
                  <section className="flex items-center justify-center bg-gray-50 border-solid hover:bg-gray-100 shadow h-full max-h-96">
                    {item.img !='No Image'? (
                      <LazyLoadImage
                        alt={item.alt || "Artwork Image"}
                        src={item.img}
                        effect="blur"
                        wrapperProps={{
                          style: { transitionDelay: "1s" },
                        }}
                        className="m-2 p-2 h-full w-full max-w-96 max-h-96 object-contain"
                      />
                    ) : (
                      <section className="flex items-center justify-center h-full w-full max-w-96 max-h-96 bg-gray-200 text-center text-sm text-gray-600 p-4">
                        No Image Available - Click for more details
                      </section>
                    )}
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
      {!loading && !error && (
        <section
          id="container"
          className="flex justify-center my-4 overflow-x-auto"
        >
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
            activeClassName="bg-blue-600 text-black font-bold border border-blue-900"
            breakClassName="px-2 py-1 text-sm md:text-base"
            previousClassName="px-3 py-1 md:px-4 md:py-2 border border-gray-300 rounded-md bg-white hover:bg-blue-500 hover:text-white transition duration-300 text-sm md:text-base"
            nextClassName="px-3 py-1 md:px-4 md:py-2 border border-gray-300 rounded-md bg-white hover:bg-blue-500 hover:text-white transition duration-300 text-sm md:text-base"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </section>
      )}
    </section>
  );
};

export default ClevelandArtWorks;
