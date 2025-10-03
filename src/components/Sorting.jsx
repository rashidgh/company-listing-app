export default function Sorting({
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
}) {
  const handleSortChange = e => {
    setSortField(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="flex items-center gap-2 ">
      <select
        value={sortField}
        onChange={handleSortChange}
        className="border text-white bg-gray-600 border-gray-600 rounded-full px-4 py-2 shadow-sm focus:outline-none sm:w-auto w-full  focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200"
      >
        <option value="">Sort by</option>
        <option value="name">Company Name</option>
        <option value="location">Location</option>
        <option value="industry">Industry</option>
      </select>

      {sortField && (
        <button
          onClick={toggleSortOrder}
          className="px-3 py-2 bg-gray-600 w-[30vw] sm:w-auto rounded-full shadow-sm hover:bg-gray-700 transition"
        >
          {sortOrder === "asc" ? "↑ Asc" : "↓ Desc"}
        </button>
      )}
    </div>
  );
}
