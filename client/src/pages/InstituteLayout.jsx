import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar/LeftSidebar";
import Topbar from "../components/Topbar/Topbar";

const InstituteLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Topbar />

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:block w-64 ">
          <LeftSidebar />
        </aside>
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default InstituteLayout;
