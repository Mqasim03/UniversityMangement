import React from "react";

export default function DataCard({ title, value, change, icon, trend }) {
    const trendColor = trend === "up" ? "text-green-500" : "text-red-500";
    const trendIcon = trend === "up" ? "↑" : "↓";
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <span className="text-3xl">{icon}</span>
        </div>
        <div className={`mt-4 flex items-center ${trendColor}`}>
          <span className="text-sm font-medium">
            {trendIcon} {change}
          </span>
          <span className="text-xs ml-1">vs last month</span>
        </div>
      </div>
    );
  }