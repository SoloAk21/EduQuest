import React from "react";
import { Outlet } from "react-router-dom";
import NavaBar from "../../components/educator/NavaBar";
import SideBar from "../../components/educator/SideBar";
import Footer from "../../components/educator/Footer";

function Educator() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <NavaBar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <SideBar />

        {/* Main Content Area */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Educator;
