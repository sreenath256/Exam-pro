import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar/Topbar";
import LeftSidebarForStudent from "../components/LeftSidebar/LeftSidebarStudent";

const StudentLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Topbar />

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:block w-64 ">
          <LeftSidebarForStudent />
        </aside>
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
