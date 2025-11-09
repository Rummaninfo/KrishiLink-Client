import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import AllCrospCard from "./AllCrospCard";
import UseFarmer from "../Hook/UseFarmer";
import { circIn } from "motion";

const AllCrops = () => {
  let { crops } = UseFarmer();

  
  let [search, setSearch] = useState("");
  let [filteredCrops, setFilteredCrops] = useState(crops);


  useEffect(()=>{
      setFilteredCrops(crops)
  }, [crops])


  console.log(search);
  let searchBar = (e) => {
    let term = e.target.value;
    setSearch(term);

    let filterdata = crops.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCrops(filterdata)
    
  };
  return (
    <div className="mt-5">
      <h1 className="text-3xl text-center font-semibold text-emerald-700 ">
        Explore All Fresh Crops
      </h1>

      <div className="flex justify-between pt-4">
        <div></div>
        <div>
          <label className="input">
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
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 pt-10 pb-10 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCrops.map((prev) => (
          <AllCrospCard prev={prev}></AllCrospCard>
        ))}
      </div>
    </div>
  );
};

export default AllCrops;
