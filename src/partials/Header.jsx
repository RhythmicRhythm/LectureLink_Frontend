import React, { useState } from "react";

import SearchModal from "../components/ModalSearch";
import Notifications from "../components/DropdownNotifications";
import Help from "../components/DropdownHelp";
import UserMenu from "../components/DropdownProfile";
import ThemeToggle from "../components/ThemeToggle";

import { RiMenu4Fill } from "react-icons/ri";

function Header({ sidebarOpen, setSidebarOpen }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
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
              <RiMenu4Fill className="text-2xl" />
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
           

            {/*  Divider */}
            {/* <hr className="w-px h-6 bg-slate-200 dark:bg-slate-700 border-none" /> */}
            {/* <UserMenu align="right" /> */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
