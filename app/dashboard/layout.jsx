"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [workoutProgress, setWorkoutProgress] = useState(0);
  const [dietProgress, setDietProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem("fitnessUser");
    if (storedUser) setUser(JSON.parse(storedUser));

    const workout = localStorage.getItem("workoutProgress");
    const diet = localStorage.getItem("dietProgress");
    if (workout) setWorkoutProgress(Number(workout));
    if (diet) setDietProgress(Number(diet));
  }, []);

  return (
    <div className="flex min-h-screen bg-[#2E3C36] text-white">
      {/* Sidebar stays fixed */}
      <Sidebar user={user} activePath={pathname} />

      {/* Main content changes */}
      <main className="flex-1 p-6 flex gap-6">
        <div className="flex-1 space-y-6">
          {/* Progress Bars (optional: only show on dashboard home) */}
          {pathname === "/dashboard" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1B2A26] p-4 rounded-lg">
                <p className="font-semibold mb-2">Workout</p>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-[#80FF72] h-4 rounded-full transition-all duration-700"
                    style={{ width: `${workoutProgress}%` }}
                  />
                </div>
                <p className="text-sm mt-1">{workoutProgress}%</p>
              </div>
              <div className="bg-[#1B2A26] p-4 rounded-lg">
                <p className="font-semibold mb-2">Diet</p>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-[#7EE8FA] h-4 rounded-full transition-all duration-700"
                    style={{ width: `${dietProgress}%` }}
                  />
                </div>
                <p className="text-sm mt-1">{dietProgress}%</p>
              </div>
            </div>
          )}

          {/* Dynamic page content */}
          {children}
        </div>

        {/* AI Assistant */}
        <div className="w-[300px] bg-[#1B2A26] p-4 rounded-lg flex flex-col">
          <h3 className="font-bold mb-3">AI Fitness Assistant</h3>
          <div className="flex-1 bg-[#2E3C36] rounded p-3 overflow-y-auto">
            <div className="mb-2 text-green-400">
              Hi! How can I help with your fitness today?
            </div>
          </div>
          <div className="flex mt-3">
            <input
              type="text"
              placeholder="Ask something..."
              className="flex-1 p-2 rounded-l bg-gray-800 text-white"
            />
            <button className="bg-[#80FF72] text-black px-4 rounded-r">
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
