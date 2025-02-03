const ChicagoSortDD = ({ setFilters, sortFilter, setSortFilter}) => {
  

  const handleSortChange = (e) => {
    const selectedValue = e.target.value;
    let sortByValue = '';
     // Map selected values to API sorting parameters
    switch (selectedValue) {
      case 'Title A-Z': sortByValue = 'titleASC'; break;
      case 'Title Z-A': sortByValue = 'titleDESC'; break;
      case 'Date (newest-oldest)': sortByValue = 'dateDESC'; break;
      case 'Date (oldest-newest)': sortByValue = 'dateASC'; break;
      case 'Artist A-Z': sortByValue = 'artistASC'; break;
      case 'Artist Z-A': sortByValue = 'artistDESC'; break;
      default: sortByValue = '';
    }
   
    // Update local sorting state
    setSortFilter(selectedValue);
  
    // Update global filters to ensure API request is correct
    setFilters((prev) => ({
      ...prev,
      sortBy: sortByValue || undefined, // Remove if empty
      page: 1 // Reset to first page when sorting changes
    }));

  };

  return (
    <section className="flex flex-col items-center w-full md:w-auto">
      <label htmlFor="sort" className="text-sm font-bold mb-1 text-center">
        Sort by:
      </label>
      <select
        id="sort"
        className="border px-3 py-2 rounded w-full h-10 text-sm md:w-auto"
        value={sortFilter || 'Title A-Z'} // Bind value to sortFilter, not filterInputs.sortBy
        onChange={handleSortChange}
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
  );
};

export default ChicagoSortDD;
