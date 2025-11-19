import React, { useEffect, useState } from "react";

import AllCrospCard from "./AllCrospCard";
import UseFarmer from "../Hook/UseFarmer";
import { Atom } from "react-loading-indicators";

const AllCrops = () => {
  let { crops, loading } = UseFarmer();

  let [search, setSearch] = useState("");
  let [filteredCrops, setFilteredCrops] = useState(crops);

  useEffect(() => {
    setFilteredCrops(crops);
  }, [crops]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Atom color="#32cd32" size="medium" text="" textColor="" />
      </div>
    );
  }

  let searchBar = (e) => {
    let term = e.target.value;
    setSearch(term);

    let filterdata = crops.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredCrops(filterdata);
  };

  return (
    <div className="mt-5">
      <h1 className="text-3xl text-center font-semibold text-emerald-700">
        Explore All Fresh Crops
      </h1>

      <div className="flex justify-between pt-4">
        <div></div>
        <div>
          <label className="input flex items-center gap-2 border rounded-lg px-3 py-2 shadow-sm">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              onChange={searchBar}
              type="search"
              required
              placeholder="Search"
              className="outline-none bg-transparent"
            />
          </label>
        </div>
      </div>

      {/* ⭐ No Result Found UI */}
      {filteredCrops.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png"
            alt="No Result"
            className="w-32 opacity-70"
          />
          <h2 className="text-xl font-semibold text-gray-700 mt-4">
            No results found
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            We couldn’t find anything matching “{search}”.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 px-3 pt-10 pb-10 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCrops.map((prev) => (
            <AllCrospCard key={prev._id} prev={prev} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCrops;
