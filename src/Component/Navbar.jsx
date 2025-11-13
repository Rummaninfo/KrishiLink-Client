import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";

const linkVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.03,
    y: -3,
    transition: { type: "spring", stiffness: 400, damping: 20 },
  },
};

const tooltipVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.18 } },
};

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

  const activeClasses =
    " font-medium text-green-600 px-2 bg-green-300 border-green-700 hover:text-green-500  rounded-sm";

  return (
    <div className="bg-emerald-600 shadow-sm">
      <div className="container mx-auto navbar px-3">
        <div className="navbar-start flex items-center gap-2">
          {/* Mobile menu button */}
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>

            {/* Mobile dropdown menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box !z-[999] mt-3 w-56 p-2 shadow"
            >
              <li>
                <NavLink
                  to="/home"
                  className={({ isActive }) => (isActive ? activeClasses : "")}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/all-crops"
                  className={({ isActive }) => (isActive ? activeClasses : "")}
                >
                  All Crops
                </NavLink>
              </li>

              {!user ? (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        isActive ? activeClasses : ""
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        isActive ? activeClasses : ""
                      }
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/myprofile"
                      className={({ isActive }) =>
                        isActive ? activeClasses : ""
                      }
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/addcrops"
                      className={({ isActive }) =>
                        isActive ? activeClasses : ""
                      }
                    >
                      Add Crops
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/myposts"
                      className={({ isActive }) =>
                        isActive ? activeClasses : ""
                      }
                    >
                      My Posts
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/myinterests"
                      className={({ isActive }) =>
                        isActive ? activeClasses : ""
                      }
                    >
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

          <Link
            to="/"
            className="btn btn-ghost text-xl font-semibold tracking-wide"
          >
            KrishiLink
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="navbar-center gap-2 hidden lg:flex">
          <ul className="px-1 flex flex-row gap-4 items-center">
            {[
              { to: "/home", label: "Home" },
              { to: "/all-crops", label: "All Crops" },
            ].map((item) => (
              <li key={item.to} className="font-medium">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? activeClasses : undefined
                  }
                >
                  <motion.span
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    variants={linkVariants}
                    className="px-2 py-1 rounded-md inline-block"
                  >
                    {item.label}
                  </motion.span>
                </NavLink>
              </li>
            ))}

            {user ? (
              <>
                {[
                  { to: "/myprofile", label: "Profile" },
                  { to: "/addcrops", label: "Add Crops" },
                  { to: "/myposts", label: "My Posts" },
                  { to: "/myinterests", label: "My Interests" },
                ].map((item) => (
                  <li key={item.to} className="font-medium">
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        isActive ? activeClasses : undefined
                      }
                    >
                      <motion.span
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                        variants={linkVariants}
                        className="px-2 py-1 rounded-md inline-block"
                      >
                        {item.label}
                      </motion.span>
                    </NavLink>
                  </li>
                ))}
              </>
            ) : null}
          </ul>
        </div>

        {/* Right side auth actions */}
        <div className="navbar-end flex items-center gap-3">
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/register" className="btn">
                Register
              </Link>
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {/* User avatar with small tooltip on hover (framer-motion) */}
              <div className="relative flex items-center">
                <motion.img
                  src={
                    user?.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.displayName || "U"
                    )}&background=38b2ac&color=fff`
                  }
                  alt={user?.displayName || "User avatar"}
                  className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm cursor-pointer"
                  whileHover={{ scale: 1.07 }}
                />

                <motion.div
                  initial="hidden"
                  whileHover="visible"
                  variants={tooltipVariants}
                  className="absolute right-0 top-full mt-2 pointer-events-none"
                  aria-hidden
                >
                  <div className="px-3 py-1 rounded-md bg-gray-800 text-white text-xs shadow">
                    {user?.displayName || "No name"}
                  </div>
                </motion.div>
              </div>

              <button onClick={handleSignOut} className="btn">
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
