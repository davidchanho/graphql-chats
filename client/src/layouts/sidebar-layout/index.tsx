import React, { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Users from "../../components/users";

function SidebarLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => setSidebarOpen(true);

  return (
    <div className="h-screen overflow-hidden">
      <Navbar openSidebar={openSidebar} />
      <div className="w-full flex flex-row h-full md:px-8 xl:px-0">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Outlet />
        <Users />
      </div>
    </div>
  );
}

export default SidebarLayout;
