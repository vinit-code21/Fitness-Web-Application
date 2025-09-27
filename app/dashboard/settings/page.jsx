"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");

  // States for form fields
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("en");
  const [voice, setVoice] = useState(false);
  const [waterReminder, setWaterReminder] = useState(false);
  const [workoutIntensity, setWorkoutIntensity] = useState("medium");
  const [dietType, setDietType] = useState("balanced");
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [notifications, setNotifications] = useState({
    workout: true,
    water: true,
    achievements: true,
  });

  const handleRestart = () => {
    localStorage.setItem("workoutProgress", "0");
    localStorage.setItem("dietProgress", "0");
    alert("Progress restarted!");
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className="bg-[#1B2A26] p-6 text-white min-h-screen w-full">
      <div className="flex gap-4 border-b border-gray-600 mb-6">
        {["profile", "preferences", "notifications", "privacy"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 capitalize ${activeTab === tab
              ? "border-b-2 border-[#80FF72] text-[#80FF72]"
              : "text-gray-400 hover:text-white"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              className="bg-[#2E3C36] p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="bg-[#2E3C36] p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-[#2E3C36] p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="bg-[#2E3C36] p-2 rounded w-full"
            />
          </div>
          <button className="bg-[#80FF72] text-black px-4 py-2 rounded">
            Save Profile
          </button>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === "preferences" && (
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Theme</span>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="bg-[#2E3C36] p-2 rounded"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>

          <div className="flex justify-between">
            <span>Language</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-[#2E3C36] p-2 rounded"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
            </select>
          </div>

          <div className="flex justify-between">
            <span>Workout Voice Guidance</span>
            <input
              type="checkbox"
              checked={voice}
              onChange={() => setVoice(!voice)}
            />
          </div>

          <div className="flex justify-between">
            <span>Water Intake Reminder</span>
            <input
              type="checkbox"
              checked={waterReminder}
              onChange={() => setWaterReminder(!waterReminder)}
            />
          </div>

          <div className="flex justify-between">
            <span>Workout Intensity</span>
            <select
              value={workoutIntensity}
              onChange={(e) => setWorkoutIntensity(e.target.value)}
              className="bg-[#2E3C36] p-2 rounded"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex justify-between">
            <span>Diet Type</span>
            <select
              value={dietType}
              onChange={(e) => setDietType(e.target.value)}
              className="bg-[#2E3C36] p-2 rounded"
            >
              <option value="balanced">Balanced</option>
              <option value="low-carb">Low Carb</option>
              <option value="high-protein">High Protein</option>
              <option value="keto">Keto</option>
            </select>
          </div>

          <div>
            <label>Daily Calorie Goal</label>
            <input
              type="number"
              value={calorieGoal}
              onChange={(e) => setCalorieGoal(e.target.value)}
              className="bg-[#2E3C36] p-2 rounded w-full mt-1"
            />
          </div>

          <button className="bg-[#80FF72] text-black px-4 py-2 rounded">
            Save Preferences
          </button>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="space-y-4">
          {Object.keys(notifications).map((key) => (
            <div key={key} className="flex justify-between">
              <span>
                {key.charAt(0).toUpperCase() + key.slice(1)} Notifications
              </span>
              <input
                type="checkbox"
                checked={notifications[key]}
                onChange={() =>
                  setNotifications((prev) => ({
                    ...prev,
                    [key]: !prev[key],
                  }))
                }
              />
            </div>
          ))}
          <button className="bg-[#80FF72] text-black px-4 py-2 rounded">
            Save Notifications
          </button>
        </div>
      )}

      {/* Privacy Tab */}
      {activeTab === "privacy" && (
        <div className="space-y-4">
          <button className="bg-blue-500 px-4 py-2 rounded w-full">
            Download My Data
          </button>
          <button
            onClick={handleRestart}
            className="bg-yellow-400 text-black px-4 py-2 rounded w-full"
          >
            Restart Progress
          </button>
          <button className="bg-red-600 px-4 py-2 rounded w-full">
            Delete My Account
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-700 px-4 py-2 rounded w-full"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
