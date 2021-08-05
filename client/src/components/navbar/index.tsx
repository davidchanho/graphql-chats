import { MenuAlt2Icon } from "@heroicons/react/outline";
import React from "react";
import Brand from "./brand";
import NavSearch from "./nav-search";
import NotificationMenu from "./notification-menu";
import ProfileDropdown from "./profile-dropdown";

interface Props {
  openSidebar: () => void;
}

function Navbar({ openSidebar }: Props) {
  return (
    <div className="relative z-10 flex-shrink-0 h-16 border-b border-gray-200 flex px-3">
      <button
        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        onClick={openSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuAlt2Icon className="h-8 w-auto" aria-hidden="true" />
      </button>
      <div className="flex-1 flex justify-between px-4 md:px-0">
        <Brand />
        <NavSearch />
        <div className="ml-4 flex items-center md:ml-6">
          <NotificationMenu />
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
