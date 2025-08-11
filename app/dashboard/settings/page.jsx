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
      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-600 mb-6">
        {["profile", "preferences", "notifications", "privacy"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-lg font-semibold transition-colors ${
              activeTab === tab
                ? "border-b-4 border-[#80FF72] text-[#80FF72]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="space-y-5 bg-[#24332E] p-6 rounded-xl shadow-lg">
          {[
            { label: "Profile Picture", type: "file", accept: "image/*" },
            { label: "Name", type: "text", placeholder: "Enter your name" },
            { label: "Email", type: "email", placeholder: "Enter your email" },
            {
              label: "Password",
              type: "password",
              placeholder: "Enter new password",
            },
          ].map((field, idx) => (
            <div key={idx}>
              <label className="block mb-1">{field.label}</label>
              <input
                type={field.type}
                accept={field.accept}
                placeholder={field.placeholder}
                className="bg-[#2E3C36] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#80FF72]"
              />
            </div>
          ))}
          <button className="bg-[#80FF72] hover:bg-[#6fe264] text-black px-6 py-3 rounded-lg font-semibold transition">
            Save Profile
          </button>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === "preferences" && (
        <div className="space-y-5 bg-[#24332E] p-6 rounded-xl shadow-lg">
          {[
            {
              label: "Theme",
              type: "select",
              value: theme,
              onChange: (e) => setTheme(e.target.value),
              options: ["dark", "light"],
            },
            {
              label: "Language",
              type: "select",
              value: language,
              onChange: (e) => setLanguage(e.target.value),
              options: ["en", "hi", "es"],
            },
            {
              label: "Workout Voice Guidance",
              type: "checkbox",
              checked: voice,
              onChange: () => setVoice(!voice),
            },
            {
              label: "Water Intake Reminder",
              type: "checkbox",
              checked: waterReminder,
              onChange: () => setWaterReminder(!waterReminder),
            },
            {
              label: "Workout Intensity",
              type: "select",
              value: workoutIntensity,
              onChange: (e) => setWorkoutIntensity(e.target.value),
              options: ["low", "medium", "high"],
            },
            {
              label: "Diet Type",
              type: "select",
              value: dietType,
              onChange: (e) => setDietType(e.target.value),
              options: ["balanced", "low-carb", "high-protein", "keto"],
            },
          ].map((item, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <span>{item.label}</span>
              {item.type === "select" && (
                <select
                  value={item.value}
                  onChange={item.onChange}
                  className="bg-[#2E3C36] p-2 rounded-lg"
                >
                  {item.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </option>
                  ))}
                </select>
              )}
              {item.type === "checkbox" && (
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={item.onChange}
                  className="w-5 h-5"
                />
              )}
            </div>
          ))}

          <div>
            <label>Daily Calorie Goal</label>
            <input
              type="number"
              value={calorieGoal}
              onChange={(e) => setCalorieGoal(e.target.value)}
              className="bg-[#2E3C36] p-3 rounded-lg w-full mt-1 focus:outline-none focus:ring-2 focus:ring-[#80FF72]"
            />
          </div>

          <button className="bg-[#80FF72] hover:bg-[#6fe264] text-black px-6 py-3 rounded-lg font-semibold transition">
            Save Preferences
          </button>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="space-y-4 bg-[#24332E] p-6 rounded-xl shadow-lg">
          {Object.keys(notifications).map((key) => (
            <div key={key} className="flex justify-between items-center">
              <span className="capitalize">{key} Notifications</span>
              <input
                type="checkbox"
                checked={notifications[key]}
                onChange={() =>
                  setNotifications((prev) => ({
                    ...prev,
                    [key]: !prev[key],
                  }))
                }
                className="w-5 h-5"
              />
            </div>
          ))}
          <button className="bg-[#80FF72] hover:bg-[#6fe264] text-black px-6 py-3 rounded-lg font-semibold transition">
            Save Notifications
          </button>
        </div>
      )}

      {/* Privacy Tab */}
      {activeTab === "privacy" && (
        <div className="space-y-4 bg-[#24332E] p-6 rounded-xl shadow-lg">
          <button className="bg-blue-500 px-6 py-3 rounded-lg w-full font-semibold hover:bg-blue-600">
            Download My Data
          </button>
          <button
            onClick={handleRestart}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg w-full font-semibold hover:bg-yellow-500"
          >
            Restart Progress
          </button>
          <button className="bg-red-600 px-6 py-3 rounded-lg w-full font-semibold hover:bg-red-700">
            Delete My Account
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-700 px-6 py-3 rounded-lg w-full font-semibold hover:bg-gray-800"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
