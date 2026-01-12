import React from "react";
import { NavLink, Outlet } from "react-router";

const activeClass =
  "bg-emerald-500 text-white font-semibold rounded-lg";

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-100 text-base-content">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* ================= CONTENT ================= */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="navbar bg-base-200 border-b border-base-300">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-4"
              className="btn btn-square btn-ghost"
            >
              ☰
            </label>
          </div>
          <div className="flex-1 px-4 font-semibold text-lg">
            Dashboard
          </div>
        </nav>

        {/* Page content */}
        <div className="p-6 bg-base-100 min-h-screen">
          <Outlet />
        </div>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <aside className="w-64 bg-base-200 min-h-full border-r border-base-300">
          <div className="px-4 py-5 font-bold text-xl text-emerald-600">
            Agro Dashboard
          </div>

          <ul className="menu px-2 text-sm gap-1">
            {/* Home */}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex gap-2 px-3 py-2 ${
                    isActive ? activeClass : "hover:bg-base-300 rounded-lg"
                  }`
                }
              >
                🏠 Home
              </NavLink>
            </li>

            <div className="divider my-2"></div>

            {/* Add Crops */}
            <li>
              <NavLink
                to="/dashboard/add"
                className={({ isActive }) =>
                  `flex gap-2 px-3 py-2 ${
                    isActive ? activeClass : "hover:bg-base-300 rounded-lg"
                  }`
                }
              >
                🌱 Add Crops
              </NavLink>
            </li>

            {/* My Posts */}
            <li>
              <NavLink
                to="/dashboard/post"
                className={({ isActive }) =>
                  `flex gap-2 px-3 py-2 ${
                    isActive ? activeClass : "hover:bg-base-300 rounded-lg"
                  }`
                }
              >
                📄 My Posts
              </NavLink>
            </li>

            {/* My Interest */}
            <li>
              <NavLink
                to="/dashboard/interest"
                className={({ isActive }) =>
                  `flex gap-2 px-3 py-2 ${
                    isActive ? activeClass : "hover:bg-base-300 rounded-lg"
                  }`
                }
              >
                ⭐ My Interest
              </NavLink>
            </li>

            <div className="divider my-2"></div>

            {/* Settings */}
            <li>
              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) =>
                  `flex gap-2 px-3 py-2 ${
                    isActive ? activeClass : "hover:bg-base-300 rounded-lg"
                  }`
                }
              >
                ⚙️ Settings
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
