import { useEffect, useState } from "react";
import CompanyTable from "./components/CompanyTable.jsx";
import Sorting from "./components/Sorting.jsx";
import companiesData from "./data/companies.json";
import FilterControls from "./components/FilterControl.jsx";

function App() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    try {
      setTimeout(() => {
        setCompanies(companiesData);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError("Failed to load companies. Please try again.");
      setLoading(false);
    }
  }, []);

  const filteredCompanies = companies
    .filter(
      c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.location.toLowerCase().includes(search.toLowerCase()) ||
        c.industry.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const fieldA = a[sortField].toLowerCase();
      const fieldB = b[sortField].toLowerCase();
      if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCompanies = filteredCompanies.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const goToPage = page => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleSearch = query => {
    setSearch(query);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading companies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Company Dashboard</h1>

      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <FilterControls search={search} onSearch={handleSearch} />
        <Sorting
          sortField={sortField}
          setSortField={setSortField}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>

      {currentCompanies.length > 0 ? (
        <>
          <CompanyTable companies={currentCompanies} />

          <div
            className="w-full flex justify-center gap-2 sm:bg-gray-700 p-2 rounded shadow 
                sm:fixed sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto"
          >
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-600 rounded disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, idx) => {
              const page = idx + 1;
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page ? "bg-blue-500" : "bg-gray-600"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-600 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500 mt-4">No companies found.</p>
      )}
    </div>
  );
}

export default App;
