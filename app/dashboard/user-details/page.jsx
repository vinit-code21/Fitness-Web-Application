"use client";

import { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export default function UserDetails() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    email: "",
    password: "",
    gender: "",
    activityLevel: "",
    weightGoal: "",
    dietType: "",
    pushups: "",
    uid: "",
    createdAt: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("fitnessUser"));
    if (storedUser?.email) {
      fetch(`/api/userdetails?email=${storedUser.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.user) {
            setFormData((prev) => ({ ...prev, ...data.user }));
          } else {
            setMessage("❌ User not found.");
          }
        })
        .catch(() => setMessage("❌ Error fetching user details."));
    } else {
      setMessage("⚠ No user found in localStorage.");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/userdetails", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setMessage(data.success ? "✅ Details updated successfully!" : "❌ " + data.message);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#0f1815] text-white rounded-xl shadow-lg border border-[#80FF72]/20 overflow-hidden">
      {/* Header (fixed inside only this box) */}
      <header className="p-5 bg-[#121f19]/80 backdrop-blur-md border-b border-[#80FF72]/30 shadow-md text-center">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#80FF72] to-[#7EE8FA] bg-clip-text text-transparent">
          User Profile Details
        </h1>
      </header>

      {/* Scrollable form section only inside center box */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-[#80FF72]/40 scrollbar-track-transparent">
        <form
          onSubmit={handleSubmit}
          className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md border border-[#80FF72]/30 p-8 rounded-2xl shadow-[0_0_25px_rgba(128,255,114,0.2)] grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* UID & Created At */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">UID</label>
            <input
              type="text"
              name="uid"
              value={formData.uid}
              readOnly
              className="w-full p-3 bg-[#1B2A26] border border-[#80FF72]/40 rounded-lg text-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Created At</label>
            <input
              type="text"
              name="createdAt"
              value={
                formData.createdAt
                  ? new Date(formData.createdAt).toLocaleString()
                  : "N/A"
              }
              readOnly
              className="w-full p-3 bg-[#1B2A26] border border-[#80FF72]/40 rounded-lg text-gray-300"
            />
          </div>

          {/* Dynamic Fields */}
          {Object.keys(formData)
            .filter((key) => !["uid", "createdAt"].includes(key))
            .map((key) =>
              key === "password" ? (
                <div key={key} className="relative">
                  <label className="block text-sm text-gray-400 mb-1">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full p-3 bg-[#1B2A26] border border-[#80FF72]/40 rounded-lg text-gray-200 placeholder-gray-500"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 cursor-pointer text-[#80FF72]"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </span>
                </div>
              ) : (
                <div key={key}>
                  <label className="block text-sm text-gray-400 mb-1 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    placeholder={`Enter ${key.replace(/([A-Z])/g, " $1")}`}
                    className="w-full p-3 bg-[#1B2A26] border border-[#80FF72]/40 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#80FF72] transition"
                  />
                </div>
              )
            )}

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            className="col-span-2 py-3 bg-gradient-to-r from-[#80FF72] to-[#7EE8FA] text-black font-semibold rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
          >
            {loading ? "Saving..." : "💾 Save Changes"}
          </button>
        </form>

        {message && (
          <p className="mt-6 text-[#80FF72] font-medium text-center">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
