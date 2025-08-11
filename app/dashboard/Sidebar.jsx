"use client";

import Link from "next/link";
import {
  FaDumbbell,
  FaAppleAlt,
  FaSpa,
  FaChartLine,
  FaUser,
  FaCog,
} from "react-icons/fa";

export default function Sidebar({ user, activePath }) {
  const menuItems = [
    { name: "Dashboard", icon: <FaChartLine />, href: "/dashboard" },
    { name: "Workout", icon: <FaDumbbell />, href: "/dashboard/workout" },
    { name: "Diet", icon: <FaAppleAlt />, href: "/dashboard/diet" },
    { name: "Yoga", icon: <FaSpa />, href: "/dashboard/yoga" },
    { name: "Calorie Tracker", icon: <FaChartLine />, href: "/dashboard/calorie-tracker" },
    { name: "User Details", icon: <FaUser />, href: "/dashboard/user-details" },
    { name: "Settings", icon: <FaCog />, href: "/dashboard/settings" },
  ];

  return (
    <aside className="w-[260px] bg-[#1B2A26] p-6 flex flex-col justify-between min-h-screen">
      <div>
        {/* Profile */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#80FF72] text-black text-xl font-bold">
            {user?.name?.charAt(0) || "U"}
          </div>
          <h3 className="mt-3 text-lg font-bold">{user?.name || "User"}</h3>
          <p className="text-sm text-gray-400">Fitness Enthusiast</p>
        </div>

        {/* Menu */}
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <div
                className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition ${
                  activePath === item.href
                    ? "bg-[#80FF72] text-black font-semibold"
                    : "text-gray-300 hover:bg-[#2e3c36] hover:text-[#80FF72]"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
        Logout
      </button>
    </aside>
  );
}
