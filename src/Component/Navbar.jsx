import React from "react";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  return (
    <div
      className=" bg-emerald-600
 shadow-sm"
    >
      <div className="container mx-auto navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            {/* drop down menu */}
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>

              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">KrishiLink</a>
        </div>
        <div className="navbar-center gap-2 hidden md:flex">
          <ul className=" px-1 flex flex-row gap-3">
            {/* home */}
            <li className="font-medium">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive
                    ? "border-l-2 border-r-2 px-1 bg-amber-400 border-green-700 hover:text-red-900"
                    : ""
                }
              >
                Home
              </NavLink>
            </li>
            {/* home */}
            <li className="font-medium">
              <NavLink
                to="/all-crops"
                className={({ isActive }) =>
                  isActive
                    ? "border-l-2 border-r-2 px-1 border-green-700 bg-yellow-400 hover:text-red-900"
                    : ""
                }
              >
                All Crops
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
