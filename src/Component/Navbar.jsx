import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";

const activeClasses =
  "font-semibold text-emerald-700 bg-emerald-200 px-3 py-1 rounded-md shadow-sm";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, userSignOut } = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      await userSignOut();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  // responsive button classes: smaller on mobile, larger on lg
  const mainBtn =
    "px-3 py-1 text-sm rounded-lg font-medium bg-white text-emerald-700 border border-emerald-600 hover:bg-emerald-600 hover:text-white transition lg:px-4 lg:py-2 lg:text-base";

  return (
    <div className="backdrop-blur-xl bg-emerald-600/95 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto navbar px-3 sm:px-4">
        {/* LEFT */}
        <div className="navbar-start flex items-center gap-3">
          {/* Mobile menu (optimized for small screens) */}
          <div className="dropdown lg:hidden">
            {/* Use a button for accessibility and clear toggle */}
            <label
              tabIndex={0}
              className="btn btn-ghost text-white p-2"
              aria-label="Open menu"
            >
              {/* slightly smaller icon for mobile */}
              <span className="text-lg">☰</span>
            </label>

            {/* Make the dropdown take full width on mobile, scrollable if long */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-2 p-3 shadow bg-white rounded-none w-full left-0 max-h-[70vh] overflow-auto"
              role="menu"
              aria-label="Mobile navigation"
            >
              <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? activeClasses : "block py-2 px-2 rounded") }>
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/all-crops"
                  className={({ isActive }) => (isActive ? activeClasses : "block py-2 px-2 rounded") }
                >
                  All Crops
                </NavLink>
              </li>

              {user ? (
                <>
                  <li>
                    <NavLink
                      to="/myprofile"
                      className={({ isActive }) => (isActive ? activeClasses : "block py-2 px-2 rounded") }
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/addcrops"
                      className={({ isActive }) => (isActive ? activeClasses : "block py-2 px-2 rounded") }
                    >
                      Add Crops
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/myposts"
                      className={({ isActive }) => (isActive ? activeClasses : "block py-2 px-2 rounded") }
                    >
                      My Posts
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/myinterests"
                      className={({ isActive }) => (isActive ? activeClasses : "block py-2 px-2 rounded") }
                    >
                      My Interests
                    </NavLink>
                  </li>

                  <li className="mt-2">
                    <button onClick={handleSignOut} className={mainBtn}>
                      Log Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className={mainBtn}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className={mainBtn}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Logo - reduce size on small screens to save space */}
          <Link
            className="text-xl sm:text-2xl flex items-center font-bold text-white tracking-wide"
            to="/"
          >
            <img
              className="h-8 sm:h-10 lg:h-12"
              src="https://i.ibb.co.com/QFswnVw3/3-05-removebg-preview.png"
              alt="KrishiLink logo"
            />
            <span className="ml-2 hidden sm:inline">KrishiLink</span>
          </Link>
        </div>

        {/* CENTER (Desktop links) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-6 text-white font-medium">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? activeClasses : "") }>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/all-crops"
                className={({ isActive }) => (isActive ? activeClasses : "") }
              >
                All Crops
              </NavLink>
            </li>

            {user && (
              <>
                <li>
                  <NavLink
                    to="/myprofile"
                    className={({ isActive }) => (isActive ? activeClasses : "") }
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/addcrops"
                    className={({ isActive }) => (isActive ? activeClasses : "") }
                  >
                    Add Crops
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/myposts"
                    className={({ isActive }) => (isActive ? activeClasses : "") }
                  >
                    My Posts
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/myinterests"
                    className={({ isActive }) => (isActive ? activeClasses : "") }
                  >
                    My Interests
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* RIGHT side */}
        <div className="navbar-end flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/register" className={mainBtn}>
                Register
              </Link>
              <Link to="/login" className={mainBtn}>
                Login
              </Link>
            </>
          ) : (
            <>
              {/* Avatar smaller on mobile and wrapped to a button to save space */}
              <motion.img
                src={
                  user?.photoURL ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user?.displayName || "User"
                  )}&background=34d399&color=fff`
                }
                alt={user?.displayName || "User avatar"}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow cursor-pointer"
                whileHover={{ scale: 1.05 }}
                title={user?.displayName || "User"}
              />

              <button onClick={handleSignOut} className={mainBtn}>
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
