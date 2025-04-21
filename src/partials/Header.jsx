import React, { useState } from "react";
import {
  RiMenu4Fill,
  RiNotification3Line,
  RiArrowDownSLine,
} from "react-icons/ri";

function Header({ sidebarOpen, setSidebarOpen }) {
  const [notificationsCount] = useState(3);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-[#0A2E43] text-white">
        <div className="w-full mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex">
              {/* Hamburger button */}
              <button
                className="text-slate-500 hover:text-slate-600 lg:hidden"
                aria-controls="sidebar"
                aria-expanded={sidebarOpen}
                onClick={(e) => {
                  e.stopPropagation();
                  setSidebarOpen(!sidebarOpen);
                }}
              >
                <span className="sr-only">Open sidebar</span>
                <RiMenu4Fill size={20} className="text-white" />
              </button>
            </div>

            <div className="flex items-center">
              <div className="relative mr-3">
                <button className="text-white p-1 rounded-full hover:bg-indigo-600 relative">
                  <RiNotification3Line size={20} />
                  {notificationsCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-xs">
                      {notificationsCount}
                    </span>
                  )}
                </button>
              </div>
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src="/api/placeholder/32/32"
                  alt="Profile"
                />
                <span className="hidden lg:block">Rhythmic Rhythm</span>
                <RiArrowDownSLine size={16} className="ml-1" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
