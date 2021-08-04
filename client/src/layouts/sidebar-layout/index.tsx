import React from "react";

interface Props {
  children: JSX.Element;
  sidebar: JSX.Element;
  navbar: JSX.Element;
}

function SidebarLayout({ children, sidebar, navbar }: Props) {
  return (
    <div className="h-screen bg-white overflow-hidden flex">
      {sidebar}
      <div className="flex-1 max-w-4xl mx-auto w-0 flex flex-col md:px-8 xl:px-0">
        {navbar}

        <div className="flex-1 flex items-stretch overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

export default SidebarLayout;
