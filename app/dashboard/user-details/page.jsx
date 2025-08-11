"use client";

import { useEffect, useState } from "react";

export default function UserDetailsPage() {
  const [user, setUser] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    email: "",
    gender: "",
    activity: "",
    goal: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("fitnessUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("fitnessUser", JSON.stringify(user));
    alert("User details updated successfully!");
  };

  return (
    <div className="flex-1 bg-[#1B2A26] p-6 rounded-xl shadow-lg border border-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-white">User Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(user).map((key) => (
          <div key={key} className="flex flex-col">
            <label
              htmlFor={key}
              className="text-gray-300 text-sm font-medium mb-1"
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              id={key}
              type="text"
              name={key}
              value={user[key]}
              onChange={handleChange}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              className="w-full p-2 rounded bg-[#2E3C36] text-white focus:outline-none focus:ring-2 focus:ring-[#80FF72]"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="mt-6 bg-[#80FF72] text-black px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
      >
        Save Changes
      </button>
    </div>
  );
}
