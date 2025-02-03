const ClevelandSortDD = ( {sortFilter,setSortFilter,setFilters} )=>{


  const handleSortChange = (e) =>{
    const selectedValue = e.target.value;
    let sortByValue = '';
    switch (selectedValue) {
      case 'Title A-Z': sortByValue = 'titleASC'; break;
      case 'Title Z-A': sortByValue = 'titleDESC'; break;
      case 'Date (newest-oldest)': sortByValue = 'dateDESC'; break;
      case 'Date (oldest-newest)': sortByValue = 'dateASC'; break;
      case 'Artist A-Z': sortByValue = 'artistASC'; break;
      case 'Artist Z-A': sortByValue = 'artistDESC'; break;
      default: sortByValue = '';
    }
    setSortFilter(selectedValue)

    setFilters((prev)=>({
      ...prev,
      sortBy:sortByValue || undefined,
     

    }))
  }

    return(
        
      <section className="flex flex-col items-center w-full md:w-auto">
         <label htmlFor="sort" className="text-sm font-bold mb-1 text-center">
    Sort by:
  </label>
 <select
    name="sort"
    id="sort"
    className="border px-3 py-2 rounded w-full h-10 text-sm md:w-auto"

      value={sortFilter || 'Title A-Z'}
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
 
        
    )

}

export default ClevelandSortDD