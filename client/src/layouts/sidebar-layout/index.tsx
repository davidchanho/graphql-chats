import React, { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Users from "../../components/users";

function SidebarLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => setSidebarOpen(true);

  return (
    <>
      <Navbar openSidebar={openSidebar} />
      <div className="h-full grid grid-cols-1 md:grid-cols-6">
        <div className="col-span-1">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
        <div className="h-full col-span-4">
          <Outlet />
        </div>
        <div className="col-span-1">
          <Users />
        </div>
      </div>
    </>
  );
}

export default SidebarLayout;
