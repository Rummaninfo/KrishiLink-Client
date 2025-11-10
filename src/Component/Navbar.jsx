import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, userSignOut } = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      await userSignOut();
      navigate("/login"); // or "/" if you prefer
    } catch (err) {
      console.error(err);
    }
  };

  const active =
    "border-l-2 border-r-2 px-1 bg-amber-400 border-green-700 hover:text-red-900";

  return (
    <div className="bg-emerald-600 shadow-sm">
      <div className="container mx-auto navbar">
        <div className="navbar-start">
          {/* Mobile menu button */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>

            {/* Mobile dropdown menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/home" className={({ isActive }) => (isActive ? active : undefined)}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/all-crops" className={({ isActive }) => (isActive ? active : undefined)}>
                  All Crops
                </NavLink>
              </li>

              {!user ? (
                <>
                  <li>
                    <NavLink to="/login" className={({ isActive }) => (isActive ? active : undefined)}>
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/register" className={({ isActive }) => (isActive ? active : undefined)}>
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/myprofile" className={({ isActive }) => (isActive ? active : undefined)}>
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/addcrops" className={({ isActive }) => (isActive ? active : undefined)}>
                      Add Crops
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/myposts" className={({ isActive }) => (isActive ? active : undefined)}>
                      My Posts
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/my-interests" className={({ isActive }) => (isActive ? active : undefined)}>
                      My Interests
                    </NavLink>
                  </li>
                  <li>
                    <button onClick={handleSignOut} className="btn btn-sm mt-1">
                      Log Out
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          <Link to="/" className="btn btn-ghost text-xl">KrishiLink</Link>
        </div>

        {/* Desktop menu */}
        <div className="navbar-center gap-2 hidden lg:flex">
          <ul className="px-1 flex flex-row gap-3">
            <li className="font-medium">
              <NavLink to="/home" className={({ isActive }) => (isActive ? active : undefined)}>
                Home
              </NavLink>
            </li>

            <li className="font-medium">
              <NavLink to="/all-crops" className={({ isActive }) => (isActive ? active : undefined)}>
                All Crops
              </NavLink>
            </li>

            {user ? (
              <>
                <li className="font-medium">
                  <NavLink to="/myprofile" className={({ isActive }) => (isActive ? active : undefined)}>
                    Profile
                  </NavLink>
                </li>
                <li className="font-medium">
                  <NavLink to="/addcrops" className={({ isActive }) => (isActive ? active : undefined)}>
                    Add Crops
                  </NavLink>
                </li>
                <li className="font-medium">
                  <NavLink to="/myposts" className={({ isActive }) => (isActive ? active : undefined)}>
                    My Posts
                  </NavLink>
                </li>
                <li className="font-medium">
                  <NavLink to="/my-interests" className={({ isActive }) => (isActive ? active : undefined)}>
                    My Interests
                  </NavLink>
                </li>
              </>
            ) : null}
          </ul>
        </div>

        {/* Right side auth actions */}
        <div className="navbar-end flex items-center gap-2">
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/register" className="btn">Register</Link>
              <Link to="/login" className="btn btn-ghost">Login</Link>
            </div>
          ) : (
            <button onClick={handleSignOut} className="btn">Log Out</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
