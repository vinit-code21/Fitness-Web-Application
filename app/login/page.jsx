"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [emailOrUid, setEmailOrUid] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrUid, password }),
      });

      const data = await res.json();
      setMessage(data.message || data.error);

      if (res.ok) {
        localStorage.setItem("fitnessUser", JSON.stringify(data.user));
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setMessage("Login failed. Try again.");
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-[#0a0a0a] relative overflow-hidden px-4">
      {/* Glowing gradient circles */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className="relative w-full max-w-lg bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/20 z-10 text-white space-y-6"
      >
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
          Welcome Back 👋
        </h2>

        <p className="text-center text-white/60 mb-4 text-sm">
          Log in to continue your fitness journey.
        </p>

        {/* Email / UID */}
        <div>
          <label htmlFor="emailOrUid" className="block text-sm font-semibold mb-2">
            Email or User ID
          </label>
          <input
            type="text"
            id="emailOrUid"
            className="w-full p-4 rounded-xl bg-white/20 border border-white/30 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            placeholder="you@example.com or UID"
            value={emailOrUid}
            onChange={(e) => setEmailOrUid(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-4 rounded-xl bg-white/20 border border-white/30 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-gradient-to-r from-green-400 to-cyan-400 text-black font-bold text-lg hover:scale-[1.03] shadow-lg transition-all duration-300"
        >
          Login
        </button>

        {/* Status Message */}
        {message && (
          <p
            className={`mt-3 text-center text-sm font-medium ${
              message.includes("successful")
                ? "text-green-300"
                : "text-red-300"
            }`}
          >
            {message}
          </p>
        )}

        {/* Link */}
        <p className="text-center text-sm text-white/70 mt-2">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-green-400 hover:text-cyan-400 transition underline"
          >
            Register
          </a>
        </p>
      </form>
    </main>
  );
}
