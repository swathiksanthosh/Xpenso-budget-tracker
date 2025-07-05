import React from "react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value, color } = payload[0];

    return (
      <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: color }}
          ></div>
          <p className="text-xs font-semibold text-gray-700">{name}</p>
        </div>
        <p className="text-sm text-gray-500">
          Amount:{" "}
          <span className="text-sm font-medium text-gray-900">
            ${value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;

