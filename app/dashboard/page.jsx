"use client";

import { useState } from "react";

export default function DashboardHome() {
  const [graphType, setGraphType] = useState("Daily");

  return (
    <div className="bg-[#1B2A26] p-6 rounded-xl flex-1 shadow-lg border border-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Progress Overview</h3>
        <div className="flex gap-2">
          {["Daily", "Weekly", "Monthly"].map((type) => (
            <button
              key={type}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                graphType === type
                  ? "bg-[#80FF72] text-black shadow-md"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
              onClick={() => setGraphType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Graph Placeholder */}
      <div className="h-[320px] flex items-center justify-center bg-[#2E3C36] rounded-lg text-gray-400 border border-gray-700">
        📊 <span className="ml-2">{graphType} Graph (Coming Soon)</span>
      </div>
    </div>
  );
}
