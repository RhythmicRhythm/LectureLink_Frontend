import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../images/Logo.png";
import { logout } from "../redux/Slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { FaBookDead, FaArrowLeft } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { PiArrowLineRightBold } from "react-icons/pi";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  const logout_user = () => {
    dispatch(logout()).then(() => {
      navigate("/signin");
    });
  };

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto
         lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 
         lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-[#ffffff] p-4 transition-all 
         duration-200 ease-in-out ${
           sidebarOpen ? "translate-x-0" : "-translate-x-64"
         }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <FaArrowLeft />
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <img className="" src={logo} alt="" />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Pages
              </span>
            </h3>
            <ul className="mt-3">
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("home") && "text-green-600"
                }`}
              >
                <NavLink
                  end
                  to="/dashboard/home"
                  className={`block text-[#4D6276] truncate transition duration-150 ${
                    pathname.includes("home")
                      ? "text-green-400"
                      : "hover:text-green-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <MdSpaceDashboard />

                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Dashboard
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("history") && "text-green-600"
                }`}
              >
                <NavLink
                  end
                  to="/courses"
                  className={`block text-[#4D6276] truncate transition duration-150 ${
                    pathname.includes("courses")
                      ? "text-green-600"
                      : "hover:text-green-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <FaBookDead />

                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Courses
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("log") && "text-green-600"
                }`}
              >
                <div // add logout here
                  className={`block text-[#4D6276] truncate transition duration-150 ${
                    pathname.includes("logout")
                      ? "text-green-600"
                      : "hover:text-green-200"
                  }`}
                >
                  <div
                    onClick={logout_user}
                    className="flex items-center cursor-pointer justify-between"
                  >
                    <div className="grow flex items-center">
                      <TbLogout2 />

                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Logout
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
             
              <PiArrowLineRightBold className="sidebar-expanded:rotate-180 text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
