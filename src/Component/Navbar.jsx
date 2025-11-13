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

  const mainBtn =
    "px-4 py-2 rounded-lg font-medium bg-white text-emerald-700 border border-emerald-600 hover:bg-emerald-600 hover:text-white transition";

  return (
    <div className="backdrop-blur-xl bg-emerald-600/90 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto navbar px-4">
        {/* LEFT */}
        <div className="navbar-start flex items-center gap-3">
          {/* Mobile menu */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost text-white">
              ☰
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-white rounded-xl w-52"
            >
              <li>
                <NavLink to="/" className={({ isActive }) => isActive && activeClasses}>
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/all-crops"
                  className={({ isActive }) => isActive && activeClasses}
                >
                  All Crops
                </NavLink>
              </li>

              {user ? (
                <>
                  <li>
                    <NavLink
                      to="/myprofile"
                      className={({ isActive }) => isActive && activeClasses}
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/addcrops"
                      className={({ isActive }) => isActive && activeClasses}
                    >
                      Add Crops
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/myposts"
                      className={({ isActive }) => isActive && activeClasses}
                    >
                      My Posts
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/myinterests"
                      className={({ isActive }) => isActive && activeClasses}
                    >
                      My Interests
                    </NavLink>
                  </li>

                  <li>
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

          {/* Logo */}
          <Link className="text-2xl flex justify-center items-center font-bold text-white tracking-wide" to="/">
         <img className="h-12" src="https://i.ibb.co.com/QFswnVw3/3-05-removebg-preview.png" alt="" />
            KrishiLink
            

          </Link>
        </div>

        {/* CENTER (Desktop links) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-6 text-white font-medium">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive && activeClasses}>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/all-crops"
                className={({ isActive }) => isActive && activeClasses}
              >
                All Crops
              </NavLink>
            </li>

            {user && (
              <>
                <li>
                  <NavLink
                    to="/myprofile"
                    className={({ isActive }) => isActive && activeClasses}
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/addcrops"
                    className={({ isActive }) => isActive && activeClasses}
                  >
                    Add Crops
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/myposts"
                    className={({ isActive }) => isActive && activeClasses}
                  >
                    My Posts
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/myinterests"
                    className={({ isActive }) => isActive && activeClasses}
                  >
                    My Interests
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* RIGHT side */}
        <div className="navbar-end flex items-center gap-4">
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
              <motion.img
                src={
                  user?.photoURL ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user?.displayName || "User"
                  )}&background=34d399&color=fff`
                }
                className="w-10 h-10 rounded-full border-2 border-white shadow cursor-pointer"
                whileHover={{ scale: 1.1 }}
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
