import React, { useEffect, useState } from "react";
import AllCrospCard from "./AllCrospCard";
import UseFarmer from "../Hook/UseFarmer";
import { Atom } from "react-loading-indicators";

const ITEMS_PER_PAGE = 8;

const AllCrops = () => {
  let { crops, loading } = UseFarmer();

  let [search, setSearch] = useState("");
  let [filteredCrops, setFilteredCrops] = useState([]);
  let [sortBy, setSortBy] = useState("");
  let [currentPage, setCurrentPage] = useState(1);

  /* ---------------- init data ---------------- */
  useEffect(() => {
    setFilteredCrops(crops);
  }, [crops]);

  /* ---------------- loading ---------------- */
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Atom color="#32cd32" size="medium" />
      </div>
    );
  }

  /* ---------------- search ---------------- */
  const searchBar = (e) => {
    const term = e.target.value;
    setSearch(term);
    setCurrentPage(1);

    let result = crops.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredCrops(result);
  };

  /* ---------------- sorting ---------------- */
  const sortCrops = (value) => {
    setSortBy(value);
    setCurrentPage(1);

    let sorted = [...filteredCrops];

    switch (value) {
      case "price-asc":
        sorted.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
        break;

      case "price-desc":
        sorted.sort((a, b) => b.pricePerUnit - a.pricePerUnit);
        break;

      case "qty-asc":
        sorted.sort((a, b) => a.quantity - b.quantity);
        break;

      case "qty-desc":
        sorted.sort((a, b) => b.quantity - a.quantity);
        break;

      default:
        sorted = [...filteredCrops];
    }

    setFilteredCrops(sorted);
  };

  /* ---------------- pagination ---------------- */
  const totalPages = Math.ceil(filteredCrops.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCrops = filteredCrops.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="mt-5">
      {/* title */}
      <h1 className="text-3xl text-center font-semibold text-emerald-700 dark:text-white">
        Explore All Fresh Crops
      </h1>

      {/* search + sort */}
      <div className="flex justify-between items-center pt-6 px-3 flex-wrap gap-3">
        <div />

        <div className="flex gap-3">
          {/* search */}
          <label className="input flex items-center gap-2 border rounded-lg px-3 py-2 shadow-sm dark:border-[#3a3a3a]">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              onChange={searchBar}
              type="search"
              placeholder="Search"
              className="outline-none bg-transparent dark:text-white"
            />
          </label>

          {/* sort */}
          <select
            value={sortBy}
            onChange={(e) => sortCrops(e.target.value)}
            className="border rounded-lg px-3 py-2 bg-white dark:bg-[#2a2a2a] dark:text-white dark:border-[#3a3a3a]"
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="qty-asc">Quantity: Low → High</option>
            <option value="qty-desc">Quantity: High → Low</option>
          </select>
        </div>
      </div>

      {/* no result */}
      {currentCrops.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png"
            alt="No Result"
            className="w-32 opacity-70"
          />
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mt-4">
            No results found
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            We couldn’t find anything matching “{search}”.
          </p>
        </div>
      ) : (
        <>
          {/* grid */}
          <div className="grid grid-cols-1 px-3 pt-10 pb-10 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {currentCrops.map((prev) => (
              <AllCrospCard key={prev._id} prev={prev} />
            ))}
          </div>

          {/* pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 pb-10">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 rounded border disabled:opacity-40 dark:border-[#3a3a3a] dark:text-white"
              >
                Prev
              </button>

              {[...Array(totalPages).keys()].map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num + 1)}
                  className={`px-3 py-1 rounded border ${
                    currentPage === num + 1
                      ? "bg-emerald-600  text-white"
                      : "dark:border-[#3a3a3a] dark:text-white"
                  }`}
                >
                  {num + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 rounded border disabled:opacity-40 dark:border-[#3a3a3a] dark:text-white"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllCrops;
