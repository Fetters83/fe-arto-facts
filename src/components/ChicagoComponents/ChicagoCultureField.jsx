const ChicagoCultureFields = ({setFilterInputs,cultureFieldError, setCultureFieldError,cultureField,setCultureField,disabled})=>{

    return(
        <section className="flex flex-col items-center w-full md:w-auto">

        <label htmlFor='culture'className="text-sm font-bold mb-1 text-center">Culture</label>
        <input id='culture'type="text" className={`border px-3 py-2 rounded w-full h-10 md:w-auto text-sm 
          ${cultureFieldError ? "border-red-500" : "border-gray-300"}`} placeholder="Search by location..."
          value={cultureField? cultureField:''}
            onChange={(e)=>{const value = e.target.value;   
             setCultureFieldError(false)
             setCultureField(value)   
            setFilterInputs((prev)=>{
            const updatedFilters = { ...prev };
                if(!value){
                delete updatedFilters.placeOfOrigin
                } else {
                updatedFilters.placeOfOrigin = value
                }
            return updatedFilters
     })}}
     disabled={disabled}
    />
         {cultureFieldError && <p className="text-red-500 text-xs mt-1">Numbers are not allowed</p>}
         
        </section>

  
    )


}

export default ChicagoCultureFields