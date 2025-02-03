import React, { useState, useEffect } from "react";
import ScaleLoader from "react-spinners/ClipLoader";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchChicagoArtworks } from "../../api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import ReactPaginate from "react-paginate";
import { HiChevronDown } from "react-icons/hi";
import { HiChevronUp } from "react-icons/hi";
import ChicagoArtTypes from "./ChicagoComponents/ChicagoArtTypesDD";
import ChicagoQueryField from "./ChicagoComponents/ChicagoQueryField";
import ChicagoArtistNameField from "./ChicagoComponents/ChicagoArtistNameField";
import ChicagoDateRangeDD from "./ChicagoComponents/ChicagoDateRangeDD";
import ChicagoCultureFields from "./ChicagoComponents/ChicagoCultureField";
import ChicagoResultsPerPageDD from "./ChicagoComponents/ChicagoResultsPerPageDD";
import ChicagoSortDD from "./ChicagoComponents/ChicagoSortDD";


const ChicagoArtWorks = () => {
  const location = useLocation();
  const [artworks, setArtworks] = useState(location.state?.artworks || []);
  const [paginationData, setPaginationData] = useState({});

  const [itemsPerPage, setItemsPerPage] = useState(
    location.state?.itemsPerPage || 12
  );
  const [filters, setFilters] = useState(
    location.state?.filters || {
      page: 1,
      limit: 12,
    }
  );
  const [filterInputs, setFilterInputs] = useState(filters); // Separate state for user input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [maxPages, setMaxPages] = useState(location.state?.maxPages || 1);

  const [queryField, setQueryField] = useState(
    location.state?.queryField || null
  );
  const [artistNameField, setArtistNameField] = useState(
    location.state?.artistNameField || null
  );
  const [artTypeField, setArtTypeField] = useState(
    location.state?.artTypeField || null
  );
  const [beginDateMarker, setBeginDateMarker] = useState(
    location.state?.beginDateMarker || "AD"
  );
  const [dateFrom, setDateFrom] = useState(location.state?.dateFrom || null);
  const [endDateMarker, setEndDateMarker] = useState(
    location.state?.endDateMarker || "AD"
  );
  const [dateTo, setDateTo] = useState(location.state?.dateTo || null);
  const [cultureField, setCultureField] = useState(
    location.state?.cultureField
  );
   const [selectedPage, setSelectedPage] = useState(
    location.state?.selectedPage || 0
  );
  const [filtersActive, setFiltersActive] = useState(false);
  const [queryFieldError, setQueryFieldError] = useState(false);
  const [cultureFieldError, setCultureFieldError] = useState(false);
  const [artistNameFieldError, setArtistNameFieldError] = useState(false);
  const [artTypeTitleFieldError, setArtTypeTitleFieldError] = useState(false);
  const [sortFilter, setSortFilter] = useState("");
  const [imageErrors, setImageErrors] = useState({});
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

        const artworksObject = await fetchChicagoArtworks(filters);

        const { artCollection, pagination } = artworksObject;
        if (!pagination) throw error;
        setPaginationData(pagination);
        if (artCollection.length === 0) throw error;
        setArtworks(artCollection);
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

  // **New useEffect to watch paginationData updates**
  useEffect(() => {
    if (paginationData.total) {
      const allowedMaxPages = Math.min(
        Math.ceil(paginationData.total / itemsPerPage),
        Math.floor(1000 / itemsPerPage)
      );

      setMaxPages(allowedMaxPages);
    }
  }, [paginationData]);

  useEffect(() => {}, [selectedPage]);

  const handleFilterInputChange = (field, value) => {
    const updatedFilters = { ...filterInputs };
    if (updatedFilters.field && (value.length === 0 || value === "")) {
      delete updatedFilters.field;
      setFilterInputs(updatedFilters);
    } else {
      setFilterInputs((prev) => ({ ...prev, [field]: value }));
    }
  };

  useEffect(() => {
    if (location.state) {
      setSelectedPage(location.state.selectedPage || 0);
      setItemsPerPage(location.state.itemsPerPage || 12);
      setFilters(location.state.filters || { page: 1, limit: 12 });
      setSortFilter(location.state.sortFilter || "");
      setArtworks(location.state.artworks || []);
      setBeginDateMarker(location.state.beginDateMarker || "AD");
      setEndDateMarker(location.state.endDateMarker || "AD");
      setArtistNameField(location.state.artistNameField || null);
      setArtTypeField(location.state.artTypeField || null);
      setDateTo(location.state.dateTo || null);
      setCultureField(location.state.cultureField || null);
      setQueryField(location.state.queryField || null);
      setFiltersActive(location.state?.filtersActive || false);
    }
  }, [location.state]);



  const handleApplyFilters = () => {
    setError(null);
    setSelectedPage(0);

    if (/\d/.test(filterInputs.q)) {
      setQueryFieldError(true);
      return;
    }

    if (/\d/.test(filterInputs.placeOfOrigin)) {
      setCultureFieldError(true); 
      return;
    }

    if (/\d/.test(filterInputs.artistName)) {
      setArtistNameFieldError(true); 
      return;
    }

    if (/\d/.test(filterInputs.artTypeTitle)) {
      setArtTypeTitleFieldError(true); 
      return;
    }

    if(filterInputs.dateBegin > filterInputs.dateEnd) {
      setBeginDateFieldError(true);
      return;
    }

    setCultureFieldError(false);
    setQueryFieldError(false);
    setCultureFieldError(false);
    setArtistNameFieldError(false);
    setArtTypeTitleFieldError(false);

    setFilters(() => ({ ...filterInputs }));

    navigate(`/collections/chicagoCollection`, { replace: true, state: null });
  };

  const handleClearFilters = () => {
    setFilterInputs(() => ({ page: 1, limit: 12 }));
    setFilters(() => ({ page: 1, limit: 12 }));
    setArtTypeField("");
    setArtistNameField("");
    setBeginDateMarker("AD");
    setDateFrom("");
    setEndDateMarker("AD");
    setDateTo("");
    setCultureField("");
    setQueryField("");
    navigate(`/collections/chicagoCollection`, { replace: true, state: null });
  };

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newPage = parseInt(event.selected);
     if (newPage >= maxPages) return;

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    setFilters((prev) => {
      const updatedFilters = { ...prev };
      updatedFilters.page = parseInt(newPage + 1, 10);
      return updatedFilters;
    });
    setSelectedPage(newPage);
  };

  const handleActivateFilters = () => {
    if (filtersActive) {
      setFiltersActive(false);
    } else {
      setFiltersActive(true);
    }
  };

  const handleImageError = (artworkId) => {
    setImageErrors((prevErrors) => ({
      ...prevErrors,
      [artworkId]: true, 
    }));
  };

  return (
    <section className="m-4 p-2">
      <section className="p-4">
        <h3 className="text-lg font-bold mb-4 text-center">
          Explore Chicago Institute of Art Artworks
        </h3>

        <section className="flex gap-2 mb-2 h-full min-h-10   md:min-h-12 md:gap">
          <ChicagoQueryField
            handleFilterInputChange={handleFilterInputChange}
            setFilterInputs={setFilterInputs}
            setSelectedPage={setSelectedPage}
            handleApplyFilters={handleApplyFilters}
            queryFieldError={queryFieldError}
            setQueryFieldError={setQueryFieldError}
            queryField={queryField}
            setQueryField={setQueryField}
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
                <section className="flex flex-col gap-2 ">
                  <ChicagoArtistNameField
                    setFilterInputs={setFilterInputs}
                    artistNameFieldError={artistNameFieldError}
                    setArtistNameFieldError={setArtistNameFieldError}
                    artistNameField={artistNameField}
                    setArtistNameField={setArtistNameField}
                    disabled={loading}
                  />
                </section>

                <section className="flex flex-col gap-2">
                  <ChicagoArtTypes
                    setFilterInputs={setFilterInputs}
                    artTypeTitleFieldError={artTypeTitleFieldError}
                    setArtTypeTitleFieldError={setArtTypeTitleFieldError}
                    artTypeField={artTypeField}
                    setArtTypeField={setArtTypeField}
                    disabled={loading}
                  />
                </section>
                <section className="flex flex-col gap-2">
                  <ChicagoDateRangeDD
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
                  <ChicagoCultureFields
                    setFilterInputs={setFilterInputs}
                    cultureFieldError={cultureFieldError}
                    setCultureFieldError={setCultureFieldError}
                    cultureField={cultureField}
                    setCultureField={setCultureField}
                    disabled={loading}
                  />
                </section>
              </section>
              <section className="flex flex-row gap-2 pt-6 pb-0">
                <button
                  onClick={handleApplyFilters}
                  className="bg-blue-500 text-white font-bold px-6 py-2 rounded hover:bg-blue-700"
                  disabled={loading}
                >
                  Apply Filters
                </button>
                <button
                  onClick={handleClearFilters}
                  className="bg-red-500 text-white font-bold  px-6 py-2 rounded hover:bg-red-700"
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
              <ChicagoResultsPerPageDD
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                setFilters={setFilters}
               
              />

              <ChicagoSortDD
                setFilters={setFilters}
                sortFilter={sortFilter}
                setSortFilter={setSortFilter}
                
              />
            </section>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {artworks.map((artwork) => (
                <section
                  key={artwork.id}
                  className="border border-solid rounded shadow p-4 cursor-pointer flex flex-col"
                  onClick={() =>
                    navigate(`/collections/chicagoCollection/${artwork.id}`, {
                      state: {
                        selectedPage,
                        /* itemOffset, */
                        itemsPerPage,
                        filters,
                        artworks,
                        sortFilter,
                        beginDateMarker,
                        endDateMarker,
                        artistNameField,
                        artTypeField,
                        dateFrom,
                        dateTo,
                        cultureField,
                        queryField,
                        filtersActive,
                      },
                    })
                  }
                >
                  <section className="flex items-center justify-center bg-gray-50 border-solid hover:bg-gray-100 shadow h-full max-h-96">
                    {!imageErrors[artwork.id] ? (
                      <LazyLoadImage
                        alt={artwork.alt || "Artwork Image"}
                        src={artwork.img}
                        effect="blur"
                        wrapperProps={{
                          style: { transitionDelay: "1s" },
                        }}
                        className="m-2 p-2 h-full w-full max-w-96 max-h-96 object-contain"
                        onError={() => handleImageError(artwork.id)}
                      />
                    ) : (
                      <section className="flex items-center justify-center h-full w-full max-w-96 max-h-96 bg-gray-200 text-center text-sm text-gray-600 p-4">
                        No Image Available - Click for more details
                      </section>
                    )}
                  </section>

                  <div className="mt-4">
                    <h2 className="text-lg font-bold">{artwork.title}</h2>
                    <p className="text-gray-600">{artwork.artist}</p>
                    <p className="text-gray-600">{artwork.date < 0 ? `BC ${artwork.date * -1}`: artwork.date > 0 && artwork.date <= 999 ? `AD ${artwork.date}`:artwork.date}</p>
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
            pageCount={maxPages}
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

export default ChicagoArtWorks;
