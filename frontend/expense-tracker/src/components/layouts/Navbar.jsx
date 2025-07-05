import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import Logo from "../../assets/images/logo3.png";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="w-full bg-[#6f54a3] h-15 rounded-xl px-6 flex items-center shadow-none mb-4">
      
      {/* Left: Logo and App Name */}
      <div className="flex items-center gap-3">
        {/* Mobile menu icon */}
        <button
          className="block md:hidden"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl text-white" />
          ) : (
            <HiOutlineMenu className="text-2xl text-white" />
          )}
        </button>

        {/* Logo and Name */}
        <img
          src={Logo}
          alt="Xpenso logo"
          className="w-8 h-8 md:block"
        />
        <h2 className="text-2xl text-white font-semibold tracking-wide">Xpenso.</h2>
      </div>

      {/* Mobile Responsive Side Menu */}
      {openSideMenu && (
        <div className="fixed top-[80px] left-0 w-64 bg-white h-[calc(100vh-80px)] shadow-md z-40 md:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;






