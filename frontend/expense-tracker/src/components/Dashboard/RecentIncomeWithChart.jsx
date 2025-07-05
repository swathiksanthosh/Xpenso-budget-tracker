import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

// Generate gradient from dark to light purple
const generateGradientColors = () => {
  const startColor = [35, 0, 120];
  const endColor = [160, 130, 255];
  const segmentCount = 80;

  return Array.from({ length: segmentCount }, (_, i) => {
    const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * (i / segmentCount));
    const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * (i / segmentCount));
    const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * (i / segmentCount));
    return `rgb(${r}, ${g}, ${b})`;
  });
};

const COLORS = generateGradientColors();

const RecentIncomeWithChart = ({ totalIncome = 0 }) => {
  const segmentCount = 80;
  const valuePerSegment = totalIncome / segmentCount;

  // Create uniform segments to replicate the ring style
  const chartData = Array.from({ length: segmentCount }, (_, i) => ({
    name: `Segment ${i + 1}`,
    amount: valuePerSegment,
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center">
      <h2 className="text-xl font-semibold mb-4">Last 60 Days Income</h2>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`$${totalIncome}`}
        colors={COLORS}
        showTextAnchor
      />

      <div className="flex justify-center gap-4 mt-4">
        <div className="px-4 py-1 rounded-md shadow text-sm bg-gray-100 text-gray-800">Expenditure</div>
        <div className="px-4 py-1 rounded-md shadow text-sm bg-gray-100 text-gray-800">Balance</div>
        <div className="px-4 py-1 rounded-md shadow text-sm bg-gray-100 text-gray-800">Income</div>
      </div>
    </div>
  );
};

export default RecentIncomeWithChart;
