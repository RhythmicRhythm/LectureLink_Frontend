import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import useRedirectLoggedOutUser from "../customHook/useRedirectLoggedOutUser";
import WelcomeSection from "../sections/WelcomeSection";
import CoursesSection from "../sections/CoursesSection";

function Dashboard() {
  useRedirectLoggedOutUser("/signin");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <WelcomeSection />
          <CoursesSection />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
