import React from 'react';
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from 'recharts';

const CustomLineChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {payload[0].payload.category}
          </p>
          <p className="text-sm text-gray-600">
            Amount:{' '}
            <span className="text-sm font-medium text-gray-900">
              ${payload[0].payload.amount}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md">
      {/* Title and tabs like 'Line | More' */}
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold text-black">Line</p>
        <div className="flex gap-4 text-sm text-gray-500">
          {/* <span className="text-purple-600 font-medium border-b-2 border-purple-600">Line</span> */}
          <span className="hover:underline cursor-pointer">More</span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* Gradient fill definition */}
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Grid lines like reference */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={true} horizontal={true} />

          {/* Axes styling */}
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#777' }}
            axisLine={false}
            tickLine={false}
            interval={0}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#777' }}
            axisLine={false}
            tickLine={false}
          />

          {/* Tooltip */}
          <Tooltip content={<CustomTooltip />} />

          {/* Line + Area */}
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#875cf5"
            fill="url(#incomeGradient)"
            strokeWidth={2}
            dot={{ r: 4, fill: '#fff', stroke: '#875cf5', strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;

