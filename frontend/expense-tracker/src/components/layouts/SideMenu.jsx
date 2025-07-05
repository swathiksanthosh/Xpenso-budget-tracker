import React, { useContext, useState } from 'react';
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from '../../context/UserContext';
import { useNavigate } from "react-router-dom";
import CharAvatar from '../Cards/CharAvatar';
import LogoutPopup from '../popups/LogoutPopup'; // ✅ Make sure the path is correct

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleClick = (route) => {
    if (route === "logout") {
      setShowLogoutPopup(true); // ✅ Show confirmation popup
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 ml-2 h-[calc(100vh-61px)] bg-white text-[#4b2673] p-5 rounded-2xl sticky top-[61px] z-20 shadow-md font-[Inter]">
      {/* Avatar Section */}
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-[#4b2673] shadow-md"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}
        <h5 className="font-medium leading-6 text-[#4b2673]">
          {user?.fullName || ""}
        </h5>
      </div>

      {/* Menu Buttons */}
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-xl font-bold transition-all duration-200
            ${
              activeMenu === item.label
                ? "bg-[#6f54a3] text-white h-[60px] px-6 rounded-xl shadow-none mb-4"
                : "hover:bg-[#f4f0fc] text-[#333] h-[60px] px-6 rounded-xl mb-4"
            }`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}

      {/* Logout Popup */}
      {showLogoutPopup && (
        <LogoutPopup
          onCancel={() => setShowLogoutPopup(false)}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default SideMenu;







