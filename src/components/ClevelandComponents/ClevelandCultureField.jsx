const ClevelandCultureFields = ({setFilterInputs, filterInputs})=>{

    return(
        <section className="flex flex-col items-center w-full md:w-auto">

        <label htmlFor='culture'className="text-sm font-bold mb-1 text-center">Culture</label>
        <input id='culture'type="text" className="border px-3 py-2 rounded w-full h-10 md:w-auto text-sm" placeholder="Search by location..."
            onChange={(e)=>{const value = e.target.value; 
            setFilterInputs((prev)=>{
            const updatedFilters = { ...prev };
                if(!value){
                delete updatedFilters.culture
                } else {
                updatedFilters.culture = value
                }
            return updatedFilters
     })}}
    />
        
        </section>

  
    )


}

export default ClevelandCultureFields