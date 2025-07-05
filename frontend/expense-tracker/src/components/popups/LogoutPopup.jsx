// components/popups/LogoutPopup.jsx

import React from "react";

function LogoutPopup({ onCancel, onLogout }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        <h2 className="text-xl font-bold mb-4">Logout Account</h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to logout? Once you logout you need to login again. Are you Ok?
        </p>
        <div className="flex">
          <button
            onClick={onCancel}
            className="flex-1 py-2 bg-violet-100 text-violet-800 font-semibold rounded-l-md hover:bg-violet-200"
          >
            Cancel
          </button>
          <button
            onClick={onLogout}
            className="flex-1 py-2 bg-violet-600 text-white font-semibold rounded-r-md hover:bg-violet-700"
          >
            Yes, Logout !
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutPopup;
