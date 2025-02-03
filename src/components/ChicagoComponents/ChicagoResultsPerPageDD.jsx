const ChicagoResultsPerPageDD = ( {setFilters,itemsPerPage,setItemsPerPage})=>{


  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value, 10);
    setItemsPerPage(newLimit); 
    setFilters((prev)=>({
      ...prev,
      limit:newLimit,
      page:1
    }))
  };
    
    return(
        <section className="flex flex-col items-center w-full md:w-auto">
   <label htmlFor="pages" className="text-sm font-bold mb-1 text-center">Results</label>
       <select
         id="pages"
         onChange={handleLimitChange}
         value={itemsPerPage}
         className="border px-3 py-2 rounded w-full h-10 text-sm md:w-auto"
       
       >
         {[12, 24, 48].map((limit) => (
           <option key={limit} value={limit}>
             {limit} Results per Page
           </option>
         ))}
       </select>
        </section>
     
       
    )
   
   
}

export default ChicagoResultsPerPageDD