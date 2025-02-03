const ChicagoDateRangeDD = ({ setFilterInputs,beginDateMarker, setBeginDateMarker, endDateMarker, setEndDateMarker,dateFrom, setDateFrom,dateTo,setDateTo,beginDateFieldError,setBeginDateFieldError,disabled }) => {
  
  console.log(dateFrom)
  return (
    <section className="flex flex-col md:flex-row gap-4 items-center w-full">
        <section className="flex flex-col items-center w-full md:w-auto">
        <label htmlFor='dateFrom'className="text-sm font-bold mb-1 text-center">Date From</label>
        <section className="flex items-center border rounded overflow-hidden h-10 w-full md:w-auto">
          <select id='dateFrom'className="border-r px-3 py-2 bg-white h-full" 
          value={beginDateMarker}
          onChange={(e) => setBeginDateMarker(e.target.value)}
          disabled={disabled}>
            <option value="AD">AD</option>
            <option value="BC">BC</option>
          </select>
          <input
            type="number"
            placeholder="Start Year"
            className={`px-3 py-2 w-24 text-sm h-full ${beginDateFieldError? "border-red-500" : "border-gray-300"}`}
            value={dateFrom? dateFrom:''}
                    onChange={(e) => {
              const value = e.target.value.trim();
              if (beginDateMarker === 'AD' && value.length > 4) return;
              if (beginDateMarker === 'BC' && value.length > 5) return;
              const formattedValue = beginDateMarker === "BC" ? -Math.abs(value) : +value;
              setBeginDateFieldError(false)
              setDateFrom(formattedValue)
              setFilterInputs((prev) => {
                const updatedFilters = { ...prev };
                if (!value) {
                  delete updatedFilters.dateBegin;
                } else {
                  updatedFilters.dateBegin = formattedValue;
                }
                return updatedFilters;
              });
            }}
            disabled={disabled}
          />
        </section>
        {beginDateFieldError && <p className="text-red-500 text-xs mt-1">Date from must be less than Date to</p>}
      </section>
        <section className="flex flex-col items-center w-full md:w-auto">
        <label htmlFor='dateTo'className="text-sm font-bold mb-1 text-center">Date To</label>
        <section className="flex items-center border rounded overflow-hidden h-10 w-full md:w-auto">
          <select id='dateTo'className="border-r px-3 py-2 bg-white h-full" 
          value={endDateMarker}
          onChange={(e) => setEndDateMarker(e.target.value)}
          disabled={disabled}>
            <option value="AD">AD</option>
            <option value="BC">BC</option>
          </select>
          <input
            type="number"
            placeholder="End Year"
            className="px-3 py-2 w-24 text-sm h-full"
            value={dateTo? dateTo:''}
            onChange={(e) => {
              const value = e.target.value.trim();
              if (endDateMarker === 'AD' && value.length > 4) return;
              if (endDateMarker === 'BC' && value.length > 5) return;
              const formattedValue = endDateMarker === "BC" ? -Math.abs(value) : +value;
              setDateTo(formattedValue)
              setFilterInputs((prev) => {
                const updatedFilters = { ...prev };
                if (!value) {
                  delete updatedFilters.dateEnd;
                } else {
                  updatedFilters.dateEnd = formattedValue;
                }
                return updatedFilters;
              });
            }}
            disabled={disabled}
          />
        </section>
      </section>
    </section>
  );
};

export default ChicagoDateRangeDD;
