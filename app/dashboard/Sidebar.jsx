"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaDumbbell,
  FaAppleAlt,
  FaSpa,
  FaChartLine,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar({ user = {}, activePath }) {
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", icon: <FaChartLine />, href: "/dashboard" },
    { name: "Workout", icon: <FaDumbbell />, href: "/dashboard/workout" },
    { name: "Diet", icon: <FaAppleAlt />, href: "/dashboard/diet" },
    { name: "Yoga", icon: <FaSpa />, href: "/dashboard/yoga" },
    { name: "Calorie Tracker", icon: <FaChartLine />, href: "/dashboard/calorie-tracker" },
    { name: "User Details", icon: <FaUser />, href: "/dashboard/user-details" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const userName = user?.name || "User";
  const firstLetter = userName.charAt(0).toUpperCase();
  const shortUID = user?.uid ? user.uid.slice(0, 8).toUpperCase() : "FIT00000";

  return (
    <aside className="w-[260px] bg-[#1A1A1A]/90 backdrop-blur-md border-r border-gray-800 flex flex-col shadow-2xl">
      {/* Profile Header */}
      <div className="p-6 border-b border-gray-800 bg-gradient-to-b from-green-400/10 to-cyan-400/10">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-cyan-400 text-black text-2xl font-extrabold shadow-lg border border-white/10">
            {firstLetter}
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold">{userName}</h2>
            <p className="text-sm text-gray-400">Fitness Enthusiast</p>
            <p className="text-xs text-gray-500 mt-1 bg-gray-800/50 px-2 py-1 rounded-full">
              UID: {shortUID}
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                activePath === item.href
                  ? "bg-gradient-to-r from-green-400/20 to-cyan-400/20 text-green-400 border border-green-400/30 shadow-md"
                  : "text-gray-300 hover:bg-gray-800/40 hover:text-white hover:shadow-lg"
              }`}
            >
              <div className="text-lg">{item.icon}</div>
              <span className="text-sm tracking-wide">{item.name}</span>
              {activePath === item.href && (
                <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-green-400 to-cyan-400" />
              )}
            </div>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md font-semibold flex items-center justify-center gap-2"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}
