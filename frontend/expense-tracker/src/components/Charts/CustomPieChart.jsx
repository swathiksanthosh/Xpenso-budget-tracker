import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const CustomPieChart = ({
  data,
  totalAmount,
  showTextAnchor,
  colors,
  label,
}) => {
  return (
    <div className="relative w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={90}
            outerRadius={120}
            paddingAngle={1}
            dataKey="amount"
            label={({ cx, cy }) =>
              showTextAnchor ? (
                <text x={cx} y={cy} fill="black" textAnchor="middle" dominantBaseline="central">
                  <tspan x={cx} dy="-0.6em" fontSize="14">{label}</tspan>
                  <tspan x={cx} dy="1.2em" fontSize="26" fontWeight="bold">{totalAmount}</tspan>
                </text>
              ) : null
            }
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;



