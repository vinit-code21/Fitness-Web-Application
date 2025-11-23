"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import AssistantUI from "./AssistantUI";

export default function Dashboard({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [workoutProgress, setWorkoutProgress] = useState(0);
  const [dietProgress, setDietProgress] = useState(0);
  const [todayCalories, setTodayCalories] = useState(0);
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(false); // 🔁 triggers updates
  const [routeKey, setRouteKey] = useState(pathname);

  // ✅ Load user
  useEffect(() => {
    const storedUser = localStorage.getItem("fitnessUser");
    if (!storedUser) {
      router.replace("/login");
      return;
    }
    const parsed = JSON.parse(storedUser);
    setUser(parsed);
  }, [router]);

  // ✅ Fetch Progress Data
  useEffect(() => {
    if (!user?.email) return;

    async function fetchProgress() {
      try {
        setLoading(true);
        const res = await fetch(`/api/progress?email=${encodeURIComponent(user.email)}`);
        const data = await res.json();
        if (data.success) {
          setWorkoutProgress(data.workoutProgress || 0);
          setDietProgress(data.dietProgress || 0);
          setTodayCalories(data.todayCalories || 0);
          setCalorieGoal(data.calorieGoal || 2000);
        }
      } catch (err) {
        console.error("❌ Error fetching progress:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProgress();
  }, [user, refreshTrigger]);

  // ✅ Listen to CalorieTracker updates
  useEffect(() => {
    const handleProgressUpdate = () => setRefreshTrigger((prev) => !prev);
    window.addEventListener("progressUpdated", handleProgressUpdate);
    return () => window.removeEventListener("progressUpdated", handleProgressUpdate);
  }, []);

  // Ensure layout resets cleanly on client-side navigation to avoid UI mashup
  useEffect(() => {
    // Force remount of the children when the pathname changes so per-page styles
    // and layouts don't leave stale DOM/CSS state behind.
    setRouteKey(pathname || "/dashboard");

    // Scroll to top and trigger a small resize event to help some components recalc sizes
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      // small timeout so the router transition can settle
      setTimeout(() => {
        try {
          window.dispatchEvent(new Event("resize"));
        } catch (e) {
          // ignore
        }
      }, 50);
    }
  }, [pathname]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0E0E0E] text-white">
      {/* Sidebar */}
      <Sidebar user={user} activePath={pathname} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Glowing Background */}
        <div className="absolute -top-40 -left-32 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-32 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />

        {/* Dashboard Cards */}
        {pathname === "/dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-10 py-8 relative z-10">
            {/* Workout Progress */}
            <div className="bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition-transform duration-300">
              <h3 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                Workout Progress
              </h3>
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden mb-3">
                <div
                  className="bg-gradient-to-r from-green-400 to-cyan-400 h-3 rounded-full transition-all duration-700"
                  style={{ width: `${workoutProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-300">
                {loading ? "Loading..." : `${workoutProgress}% Completed — Keep pushing 💪`}
              </p>
            </div>

            {/* Calorie / Diet Progress */}
            <div className="bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition-transform duration-300">
              <h3 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
                Calorie Tracker
              </h3>
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden mb-3">
                <div
                  className={`h-3 transition-all duration-700 ${
                    todayCalories > calorieGoal
                      ? "bg-red-500"
                      : "bg-gradient-to-r from-cyan-400 to-green-400"
                  }`}
                  style={{ width: `${dietProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-300">
                {loading ? "Loading..." : `${todayCalories} / ${calorieGoal} kcal (${dietProgress}%)`}
              </p>
            </div>
          </div>
        )}

  {/* Child Pages - keyed by route to force remount on navigation */}
  <div key={routeKey} className="px-10 py-6 relative z-10 overflow-y-auto no-scrollbar">{children}</div>
      </div>

      {/* AI Assistant Panel */}
      <div className="w-[340px] bg-[#121212]/90 backdrop-blur-xl border-l border-white/10 flex flex-col">
        <div className="flex-1 overflow-hidden">
          <AssistantUI />
        </div>
      </div>

      {/* Hide Scrollbars */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }
        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .no-scrollbar {
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </div>
  );
}
