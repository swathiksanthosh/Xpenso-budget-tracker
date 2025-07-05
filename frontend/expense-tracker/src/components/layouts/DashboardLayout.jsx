import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-neutral-300">
      {/* Rounded Navbar Container */}
      <div className="px-4 pt-4">
        <div className="rounded-2xl overflow-hidden">
          <Navbar activeMenu={activeMenu} />
        </div>
      </div>

      {user && (
        <div className="flex mt-4">
          {/* SideMenu */}
          <div className="w-64">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* Main Content */}
          <div className="flex-grow p-6">
            <div className="max-w-[1500px] mx-auto w-full">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;




