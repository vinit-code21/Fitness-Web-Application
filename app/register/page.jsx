"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    weight: "",
    height: "",
    gender: "",
    activity: "",
    mainGoal: "",
    dietType: "",
    pushups: "",
  });

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = { ...formData, uid: crypto.randomUUID() };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      setMessage(data.message || data.error);

      if (res.ok) {
        localStorage.setItem(
          "fitnessUser",
          JSON.stringify({ email: formData.email })
        );
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setMessage("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[url('https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-4xl p-10 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 text-white space-y-6"
      >
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
          Create Your Account
        </h1>
        <p className="text-center text-white/70 text-sm mb-4">
          Join our fitness community and start your transformation!
        </p>

        <div className="grid grid-cols-2 gap-6">
          {/* LEFT COLUMN */}
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#1f1f1f] border border-white/20 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#1f1f1f] border border-white/20 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-[#1f1f1f] border border-white/20 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-white/70 hover:text-white text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { name: "age", placeholder: "Age" },
                { name: "weight", placeholder: "Weight (kg)" },
                { name: "height", placeholder: "Height (cm)" },
              ].map((field) => (
                <input
                  key={field.name}
                  type="number"
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 rounded-xl bg-[#1f1f1f] border border-white/20 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">
            {/** --- Select Styles Fix --- **/}
            <style jsx global>{`
              select,
              option {
                background-color: #1f1f1f !important;
                color: white !important;
              }
              select:focus,
              option:focus,
              option:checked {
                background-color: #1f1f1f !important;
                color: white !important;
              }
            `}</style>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#1f1f1f] border border-white/20 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="" disabled className="text-gray-400">
                Select Gender
              </option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <select
              name="activity"
              value={formData.activity}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#1f1f1f] border border-white/20 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="" disabled className="text-gray-400">
                Activity Level
              </option>
              <option>Low</option>
              <option>Moderate</option>
              <option>High</option>
            </select>

            <div className="grid grid-cols-2 gap-3">
              <select
                name="mainGoal"
                value={formData.mainGoal}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-xl bg-[#1f1f1f] border border-white/20 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value="" disabled className="text-gray-400">
                  Main Goal
                </option>
                <option>Lose Weight</option>
                <option>Gain Muscle</option>
                <option>Maintain</option>
              </select>

              <select
                name="dietType"
                value={formData.dietType}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-xl bg-[#1f1f1f] border border-white/20 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value="" disabled className="text-gray-400">
                  Diet Type
                </option>
                <option>Vegetarian</option>
                <option>Non-Vegetarian</option>
                <option>Vegan</option>
              </select>
            </div>

            <input
              type="number"
              name="pushups"
              placeholder="Daily Pushups"
              value={formData.pushups}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#1f1f1f] border border-white/20 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>

        <div className="flex flex-col items-center space-y-3">
          <button
            type="submit"
            disabled={loading}
            className="w-1/2 py-4 rounded-xl bg-gradient-to-r from-green-400 to-cyan-400 text-black font-bold text-lg hover:scale-[1.03] shadow-lg transition-all duration-300"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          {message && (
            <p
              className={`text-sm ${
                message.includes("successfully")
                  ? "text-green-200"
                  : "text-red-300"
              }`}
            >
              {message}
            </p>
          )}

          <p className="text-sm text-white/70">
            Already have an account?{" "}
            <a href="/login" className="text-cyan-400 underline">
              Login
            </a>
          </p>
        </div>
      </form>
    </section>
  );
}
