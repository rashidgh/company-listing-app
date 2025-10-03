export default function FilterControls({ search, onSearch }) {
  return (
    <div className="flex justify-center mb-4">
      <div className="relative sm:w-[50vw] w-full max-w-md">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          🔍
        </span>
        <input
          type="text"
          placeholder="Search by company, location, industry"
          value={search}
          onChange={e => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border text-white bg-gray-600 border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400  transition duration-200 "
        />
      </div>
    </div>
  );
}
