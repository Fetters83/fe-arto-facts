const ClevelandSortDD = ( {filterInputs,setFilterInputs} )=>{

    return(
        
      <section className="flex flex-col items-center w-full md:w-auto">
        {/* Label */}
        <label htmlFor="sort" className="text-sm font-bold mb-1 text-center">
    Sort by:
  </label>

  {/* Select Box */}
  <select
    name="sort"
    id="sort"
    className="border px-3 py-2 rounded w-full h-10 text-sm md:w-auto"
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
     setFilterInputs((prev) => {
      const updatedFilters = { ...prev };
      if(!sortByValue){
          delete updatedFilters.sortBy
      } else {
          updatedFilters.sortBy = sortByValue
        }
        return updatedFilters
     }); 
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
 
        
    )

}

export default ClevelandSortDD