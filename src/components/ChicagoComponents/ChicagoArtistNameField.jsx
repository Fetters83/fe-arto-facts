const ChicagoArtistNameField = ({setFilterInputs, artistNameFieldError,setArtistNameFieldError,artistNameField,setArtistNameField,disabled})=>{

    return(
        <section className="flex flex-col items-center w-full md:w-auto">

        <label htmlFor='artistName'className="text-sm font-bold mb-1 text-center">Artist Name</label>
        <input id='artistName'type="text" className={`border px-3 py-2 rounded w-full h-10 md:w-auto text-sm 
          ${artistNameFieldError ? "border-red-500" : "border-gray-300"}`} placeholder="Search by artist..."
          value={artistNameField? artistNameField: ''}
            onChange={(e)=>{const value = e.target.value;
                setArtistNameField(value) 
                setArtistNameFieldError(false)
            setFilterInputs((prev)=>{
            const updatedFilters = { ...prev };
                if(!value){
                delete updatedFilters.artistName
                } else {
                updatedFilters.artistName = value
                }
            return updatedFilters
     })}}
     disabled={disabled}
    />
          {artistNameFieldError && <p className="text-red-500 text-xs mt-1">Numbers are not allowed</p>}
        </section>

  
    )


}

export default ChicagoArtistNameField