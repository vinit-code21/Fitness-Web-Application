"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    email: "",
    password: "",
    gender: "",
    activity: "",
    mainGoal: "",
    dietType: "",
    pushups: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Prepare suggestedPlans (placeholder)
      const suggestedPlans = [];

      const response = await fetch("/api/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // no Firebase UID — backend will create a local uid
          name: formData.name,
          email: formData.email,
          age: parseInt(formData.age) || null,
          weight: parseFloat(formData.weight) || null,
          height: parseFloat(formData.height) || null,
          gender: formData.gender,
          activity: formData.activity,
          mainGoal: formData.mainGoal,
          dietType: formData.dietType,
          pushups: parseInt(formData.pushups) || 0,
          suggestedPlans,
        }),
      });

      if (response.status === 409) {
        setError("Email already in use");
        return;
      }

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to register");
      }

      // Success: store user in localStorage and redirect to dashboard for that email
      const resData = await response.json();
      try {
        const user = { email: formData.email, uid: resData.uid };
        // basic client-side session
        localStorage.setItem("fitness_user", JSON.stringify(user));
      } catch (e) {
        // ignore storage errors
      }
      router.push(`/dashboard?email=${encodeURIComponent(formData.email)}`);
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1B2A26] via-[#2E3C36] to-[#1B2A26] flex justify-center items-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-[#202F2B]/80 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-5 border border-[#80FF72]/30"
      >
        <h1 className="text-4xl font-extrabold text-center text-[#80FF72] tracking-wide">
          Fitness Registration
        </h1>

        {error && (
          <p className="text-red-400 text-center font-semibold">{error}</p>
        )}

        {/* Name & Age */}
        <div className="flex gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="flex-1 p-3 rounded-lg bg-[#2E3C36] text-white focus:ring-2 focus:ring-[#80FF72] transition"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            className="w-1/3 p-3 rounded-lg bg-[#2E3C36] text-white focus:ring-2 focus:ring-[#80FF72] transition"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        {/* Weight & Height */}
        <div className="flex gap-4">
          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            className="flex-1 p-3 rounded-lg bg-[#2E3C36] text-white focus:ring-2 focus:ring-[#80FF72] transition"
            value={formData.weight}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            className="flex-1 p-3 rounded-lg bg-[#2E3C36] text-white focus:ring-2 focus:ring-[#80FF72] transition"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-[#2E3C36] text-white focus:ring-2 focus:ring-[#80FF72] transition"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-[#2E3C36] text-white focus:ring-2 focus:ring-[#80FF72] transition"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Gender */}
        <select
          name="gender"
          className="w-full p-3 rounded-lg bg-[#2E3C36] text-white focus:ring-2 focus:ring-[#80FF72] transition"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        {/* Activity Level */}
        <select
          name="activity"
          className="w-full p-3 rounded-lg bg-[#2E3C36] text-white focus:ring-2 focus:ring-[#80FF72] transition"
          value={formData.activity}
          onChange={handleChange}
          required
        >
          <option value="">Activity Level</option>
          <option value="sedentary">Sedentary</option>
          <option value="light">Lightly active</option>
          <option value="moderate">Moderately active</option>
          <option value="very">Very active</option>
          <option value="extra">Super active</option>
        </select>

        {/* Main Goal */}
        <select
          name="mainGoal"
          className="w-full p-3 rounded-lg bg-[#2E3C36] text-white focus:ring-2 focus:ring-[#80FF72] transition"
          value={formData.mainGoal}
          onChange={handleChange}
          required
        >
          <option value="">Main Fitness Goal</option>
          <option value="lose">Lose Weight</option>
          <option value="build">Build Muscle</option>
          <option value="fit">Keep Fit</option>
        </select>

        {/* Diet Type */}
        <select
          name="dietType"
          className="w-full p-3 rounded-lg bg-[#2E3C36] text-white focus:ring-2 focus:ring-[#80FF72] transition"
          value={formData.dietType}
          onChange={handleChange}
          required
        >
          <option value="">Diet Preference</option>
          <option value="veg">Vegetarian</option>
          <option value="non-veg">Non-Vegetarian</option>
        </select>

        {/* Push-up Count */}
        <input
          type="number"
          name="pushups"
          placeholder="How many push-ups can you do?"
          className="w-full p-3 rounded-lg bg-[#2E3C36] text-white focus:ring-2 focus:ring-[#80FF72] transition"
          value={formData.pushups}
          onChange={handleChange}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-bold text-black bg-gradient-to-r from-[#80FF72] to-[#7EE8FA] hover:from-[#7EE8FA] hover:to-[#80FF72] transition-all duration-300 transform hover:scale-105"
        >
          {loading ? "Registering..." : "🚀 Register Now"}
        </button>
      </form>
    </main>
  );
}
