import React, { useState } from "react";
import Messages from "../../components/messages";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Users from "../../components/users";
import SidebarLayout from "../../layouts/sidebar-layout";

export default function Chatroom() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => setSidebarOpen(true);

  return (
    <SidebarLayout
      sidebar={
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      }
      navbar={<Navbar openSidebar={openSidebar} />}
    >
      <>
        <main className="flex-1 overflow-y-auto">
          <Messages />
        </main>
        <aside className="hidden w-96 bg-white border-l border-gray-200 overflow-y-auto lg:block">
          <Users />
        </aside>
      </>
    </SidebarLayout>
  );
}
