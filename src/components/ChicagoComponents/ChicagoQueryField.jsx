import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";


const ChicagoQueryField = ({setFilterInputs,setSelectedPage,handleApplyFilters,queryFieldError,setQueryFieldError,queryField,setQueryField,disabled}) =>{

  return(
<>
<input type="text" className={`flex-grow border-2 border-solid border-gray w-full max-w-21 md:max-w-15 ${queryFieldError? "border-red-500" : "border-gray-300"}`}  placeholder=" Search all fields..."
  value={queryField? queryField: ''}
  onChange={(e)=>{const value = e.target.value;
    setQueryField(value)
    setQueryFieldError(false)
    setFilterInputs((prev)=>{
      const updatedFilters = { ...prev };
      if(!value || value === ''){
        delete updatedFilters.q
    } else {
        updatedFilters.q = value
      }
      console.log(updatedFilters)
      return updatedFilters 
    })
  }}
  disabled={disabled}/>
  <button id='search' aria-label='search'className='flex-grow-0 items-center justify-center border-2 border-solid border-gray rounded focus:outline-none w-full max-w-10 md:max-w-12'
     onClick={() => {
      handleApplyFilters()
       setSelectedPage(0)


    }}
    disabled={disabled}>
         <IoIosSearch className='w-full'/>
    </button>
   
</>

  )


}

export default ChicagoQueryField