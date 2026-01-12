import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";
import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md"


const activeClasses =
  "font-semibold text-emerald-700 bg-emerald-200 px-3 py-1 rounded-md shadow-sm";

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);


  const { user, userSignOut } = useContext(AuthContext);

 

  const handleSignOut = async () => {
    try {
      await userSignOut();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  // responsive button classes
  const mainBtn =
    "px-3 py-1 text-sm rounded-lg font-medium bg-white text-emerald-700 border border-emerald-600 hover:bg-emerald-600 hover:text-white transition lg:px-4 lg:py-2 lg:text-base";

  // ---- mobile menu toggle logic ----
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((s) => !s);
  const closeMenu = () => setIsOpen(false);

  const btnRef = useRef(null);
  const menuRef = useRef(null);

  // close on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen]);

  // close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // fast animation settings
  const anim = {
    initial: { opacity: 0, y: -8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.12, ease: "easeOut" },
  };

useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;


  // console.log(currentTheme)

  return (
    <div className="backdrop-blur-xl bg-emerald-600/95  dark:bg-gray-900  z-50 shadow-md">
      <div className="container mx-auto navbar px-3  sm:px-4">
        {/* LEFT */}
        <div className="navbar-start flex items-center gap-3">
          {/* Mobile menu button */}
          <div className="lg:hidden relative">
            <button
              ref={btnRef}
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="btn btn-ghost text-white p-2"
            >
              {/* hamburger -> simple accessible icon; can replace with svg */}
              <span className="text-lg select-none">{isOpen ? "✕" : "☰"}</span>
            </button>

            {/* Mobile menu (AnimatePresence handles enter/exit) */}
            <AnimatePresence>
              {isOpen && (
                <motion.ul
                  id="mobile-menu"
                  ref={menuRef}
                  role="menu"
                  aria-label="Mobile navigation"
                  initial={anim.initial}
                  animate={anim.animate}
                  exit={anim.exit}
                  transition={anim.transition}
                  className="
                    menu menu-sm
                    mt-2 p-3 shadow bg-gray-900 rounded-b-lg
                    fixed left-0 right-0
                    top-[56px]  /* adjust if your navbar height differs */
                    z-50
                    max-h-[72vh] overflow-auto
                    mx-0
                  "
                >
                  <li>
                    <NavLink
                      to="/"
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        isActive ? activeClasses : "block py-2 px-2 rounded"
                      }
                    >
                      Home
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/all-crops"
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        isActive ? activeClasses : "block py-2 px-2 rounded"
                      }
                    >
                      All Crops
                    </NavLink>
                  </li>

                  {user ? (
                    <>
                      <li>
                        <NavLink
                          to="/myprofile"
                          onClick={closeMenu}
                          className={({ isActive }) =>
                            isActive ? activeClasses : "block py-2 px-2 rounded"
                          }
                        >
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/addcrops"
                          onClick={closeMenu}
                          className={({ isActive }) =>
                            isActive ? activeClasses : "block py-2 px-2 rounded"
                          }
                        >
                          Add Crops
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/myposts"
                          onClick={closeMenu}
                          className={({ isActive }) =>
                            isActive ? activeClasses : "block py-2 px-2 rounded"
                          }
                        >
                          My Posts
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/myinterests"
                          onClick={closeMenu}
                          className={({ isActive }) =>
                            isActive ? activeClasses : "block py-2 px-2 rounded"
                          }
                        >
                          My Interests
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="dashboard"
                          
                          className={({ isActive }) =>
                            isActive ? activeClasses : "block py-2 px-2 rounded"
                          }
                        >
                          Dashboard
                        </NavLink>
                      </li>

                    

                      <li className="mt-2">
                        <button
                          onClick={() => {
                            handleSignOut();
                            closeMenu();
                          }}
                          className={mainBtn}
                        >
                          Log Out
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/login"
                          onClick={closeMenu}
                          className={mainBtn}
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/register"
                          onClick={closeMenu}
                          className={mainBtn}
                        >
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* LOGO */}
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
              <NavLink
                to="/"
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

            {user && (
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
                {/* <li>
                  <NavLink
                    to="/addcrops"
                    className={({ isActive }) =>
                      isActive ? activeClasses : ""
                    }
                  >
                    Add Crops
                  </NavLink>
                </li> */}
                {/* <li>
                  <NavLink
                    to="/myposts"
                    className={({ isActive }) =>
                      isActive ? activeClasses : ""
                    }
                  >
                    My Posts
                  </NavLink>
                </li> */}
                {/* <li>
                  <NavLink
                    to="/myinterests"
                    className={({ isActive }) =>
                      isActive ? activeClasses : ""
                    }
                  >
                    My Interests
                  </NavLink>
                </li> */}
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive ? activeClasses : ""
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* RIGHT */}
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
              {/* <input  type="checkbox" defaultChecked className="toggle" /> */}
                <button
  className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 
             dark:bg-red-700 dark:hover:bg-red-600 transition-colors"
  onClick={() => setTheme(currentTheme === "light" ? "dark" : "light")}
>
  {currentTheme === "light" ? (
    <MdDarkMode size={22} />
  ) : (
    <MdLightMode size={22} />
  )}
</button>

            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
