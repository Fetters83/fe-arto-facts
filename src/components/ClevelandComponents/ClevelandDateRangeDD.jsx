const ClevelandDateRangeDD = ({ setFilterInputs, filterInputs, beginDateMarker, setBeginDateMarker, endDateMarker, setEndDateMarker }) => {
  return (
    <section className="flex flex-col md:flex-row gap-4 items-center w-full">
      {/* Start Date */}
      <section className="flex flex-col items-center w-full md:w-auto">
        <label htmlFor='dateFrom'className="text-sm font-bold mb-1 text-center">Date From</label>
        <section className="flex items-center border rounded overflow-hidden h-10 w-full md:w-auto">
          <select id='dateFrom'className="border-r px-3 py-2 bg-white h-full" onChange={(e) => setBeginDateMarker(e.target.value)}>
            <option value="AD">AD</option>
            <option value="BC">BC</option>
          </select>
          <input
            type="number"
            placeholder="Start Year"
            className="px-3 py-2 w-24 text-sm h-full"
            onChange={(e) => {
              const value = e.target.value.trim();
              const formattedValue = beginDateMarker === "BC" ? -Math.abs(value) : +value;
              setFilterInputs((prev) => {
                const updatedFilters = { ...prev };
                if (!value) {
                  delete updatedFilters.created_after;
                } else {
                  updatedFilters.created_after = formattedValue;
                }
                return updatedFilters;
              });
            }}
          />
        </section>
      </section>

      {/* End Date */}
      <section className="flex flex-col items-center w-full md:w-auto">
        <label htmlFor='dateTo'className="text-sm font-bold mb-1 text-center">Date To</label>
        <section className="flex items-center border rounded overflow-hidden h-10 w-full md:w-auto">
          <select id='dateTo'className="border-r px-3 py-2 bg-white h-full" onChange={(e) => setEndDateMarker(e.target.value)}>
            <option value="AD">AD</option>
            <option value="BC">BC</option>
          </select>
          <input
            type="number"
            placeholder="End Year"
            className="px-3 py-2 w-24 text-sm h-full"
            onChange={(e) => {
              const value = e.target.value.trim();
              const formattedValue = endDateMarker === "BC" ? -Math.abs(value) : +value;
              setFilterInputs((prev) => {
                const updatedFilters = { ...prev };
                if (!value) {
                  delete updatedFilters.created_before;
                } else {
                  updatedFilters.created_before = formattedValue;
                }
                return updatedFilters;
              });
            }}
          />
        </section>
      </section>
    </section>
  );
};

export default ClevelandDateRangeDD;
