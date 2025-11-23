"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WorkoutPage() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [completedDays, setCompletedDays] = useState([]);
  const router = useRouter();

  // ✅ Fetch user, workout, and progress
  useEffect(() => {
    async function fetchUserAndWorkout() {
      try {
        const storedUser =
          typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("fitnessUser"))
            : null;

        const userEmail = storedUser?.email;
        if (!userEmail) {
          setError("No user logged in.");
          setLoading(false);
          router.push("/login");
          return;
        }

        const userRes = await fetch(`/api/userdetails?email=${userEmail}`);
        const userData = await userRes.json();

        if (!userData.success || !userData.user) {
          setError("User not found.");
          setLoading(false);
          return;
        }

        setUser(userData.user);

        // ✅ Load completedDays from DB
        const savedDays = userData.user.completedDays || [];
        setCompletedDays(savedDays);

        const goalText = userData.user.weightGoal?.toLowerCase() || "";
         const userGoal = "gain"; // or fetch dynamically from user if you prefer
        const userLevel = "advanced";

        const planRes = await fetch(
          `/api/workout?goal=${userGoal}&level=${userLevel}`
        );
        const planData = await planRes.json();

        if (!planData.success || !planData.plan) {
          setError("No workout plan found for your profile.");
          setLoading(false);
          return;
        }

        setPlan(planData.plan);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching workout:", err);
        setError("Failed to load workout plan.");
        setLoading(false);
      }
    }

    fetchUserAndWorkout();
  }, [router]);

  // ✅ Update MongoDB progress
  const syncProgress = async (updatedDays) => {
    if (!user?.email) return;
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          completedDays: updatedDays,
        }),
      });
      // notify other parts of the app (dashboard) to refresh progress
      try {
        window.dispatchEvent(new Event("progressUpdated"));
      } catch (e) {
        // ignore in non-browser environments
      }
    } catch (err) {
      console.error("Error syncing progress:", err);
    }
  };

  // ✅ Handle mark done / unmark
  const handleMarkDone = async (day) => {
    let updatedDays = [...completedDays];
    if (updatedDays.includes(day)) {
      updatedDays = updatedDays.filter((d) => d !== day);
    } else {
      updatedDays.push(day);
    }
    setCompletedDays(updatedDays);
    await syncProgress(updatedDays);
  };

  // ✅ Reset all progress
  const handleResetProgress = async () => {
    if (
      !confirm(
        "Are you sure you want to reset your weekly progress? This action cannot be undone."
      )
    )
      return;

    setCompletedDays([]);
    await syncProgress([]);
  };

  // ✅ Progress percentage
  const progress =
    plan && plan.plan?.length > 0
      ? Math.round((completedDays.length / plan.plan.length) * 100)
      : 0;

    // Determine active workout days using plan.daysPerWeek (fallback to plan length or 6)
    const daysPerWeek = plan?.daysPerWeek || (plan?.plan?.length ? plan.plan.length : 6);
    const activeWorkoutDays = (plan?.plan || [])
      .filter((d) => !d.exercise?.toLowerCase().includes("rest"))
      .slice(0, daysPerWeek);
    const activeDayNames = new Set(activeWorkoutDays.map((d) => d.day));
    const completedActiveCount = completedDays.filter((d) => activeDayNames.has(d)).length;
    const accurateProgress =
      activeWorkoutDays.length > 0
        ? Math.round((completedActiveCount / activeWorkoutDays.length) * 100)
        : 0;
  // ✅ Loading & Error
  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#050607] via-[#081014] to-[#030405]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-t-green-400 border-gray-800 animate-spin" />
          <p className="text-gray-300 text-lg">Loading your personalized plan...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#050607] via-[#081014] to-[#030405]">
        <div className="text-center">
          <p className="text-red-400 text-lg font-semibold mb-4">{error}</p>
          <button onClick={() => router.push("/dashboard")} className="px-6 py-2 bg-gradient-to-r from-[#80FF72] to-[#7EE8FA] text-black font-semibold rounded-lg hover:scale-105 transition-transform">
            Back to Dashboard
          </button>
        </div>
      </div>
    );

  // ✅ UI
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050607] via-[#081014] to-[#030405] text-white overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-green-700/10 bg-[#0b1112]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#80FF72] to-[#7EE8FA] bg-clip-text text-transparent">
              💪 Workout Plan
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {user?.name ? `${user.name}'s ` : ""}{plan?.goal?.toUpperCase()} • Level: {plan?.level} • {plan?.daysPerWeek} Days/Week
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleResetProgress}
              className="px-4 py-2 text-sm font-semibold bg-white/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-all duration-300"
            >
              🔄 Reset
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-[#80FF72] to-[#7EE8FA] text-black rounded-lg hover:scale-105 transition-transform"
            >
              Back
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Progress Card */}
        <div className="bg-[#0b1112]/60 border border-green-700/20 rounded-3xl p-8 mb-10 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-300 mb-1">Weekly Progress</h2>
        <p className="text-3xl font-extrabold bg-gradient-to-r from-[#80FF72] to-[#7EE8FA] bg-clip-text text-transparent">
          {completedActiveCount} / {activeWorkoutDays.length} Days
        </p>
            </div>
            <div className="text-right">
                <p className="text-4xl font-bold text-[#80FF72]">{accurateProgress}%</p>
              <p className="text-xs text-gray-400">Complete</p>
            </div>
          </div>
          <div className="w-full bg-[#1a2a25] h-3 rounded-full overflow-hidden">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-[#80FF72] to-[#7EE8FA] transition-all duration-700"
              style={{ width: `${accurateProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Workout Cards - One per row */}
        <div className="space-y-4">
          {plan?.plan?.map((item, index) => {
            const isDone = completedDays.includes(item.day);
            return (
              <div
                key={index}
                className={`bg-[#0b1112]/60 border rounded-2xl p-6 shadow-lg transition-all duration-300 group ${
                  isDone
                    ? "border-[#80FF72]/50 ring-1 ring-[#80FF72]/30 shadow-[0_0_15px_rgba(128,255,114,0.2)]"
                    : "border-green-700/20 hover:border-green-700/40"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Day Header */}
                  <div className="flex items-start justify-between md:block md:min-w-[180px]">
                    <div>
                      <h3 className="text-2xl font-extrabold text-[#80FF72] mb-1">
                        {item.day}
                      </h3>
                      <p className="text-sm text-gray-400">{item.exercise}</p>
                    </div>
                    {isDone && (
                      <div className="md:hidden bg-[#80FF72]/20 border border-[#80FF72] rounded-full p-2">
                        <span className="text-[#80FF72] text-lg">✓</span>
                      </div>
                    )}
                  </div>

                  {/* Workout Exercises - Horizontal Layout */}
                  <div className="flex-1 flex flex-wrap gap-3">
                    {item.workout?.map((w, i) => (
                      <div
                        key={i}
                        className="flex-shrink-0 flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg text-sm border border-green-700/20 hover:border-green-700/40 transition-colors"
                      >
                        <span className="font-medium text-gray-200 whitespace-nowrap">{w.name}</span>
                        <span className="text-[#7EE8FA] font-semibold whitespace-nowrap">
                          {w.sets}×{w.reps}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 md:ml-4">
                    {isDone && (
                      <div className="hidden md:flex bg-[#80FF72]/20 border border-[#80FF72] rounded-full p-2">
                        <span className="text-[#80FF72] text-lg">✓</span>
                      </div>
                    )}
                    <button
                      onClick={() => handleMarkDone(item.day)}
                      className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                        isDone
                          ? "bg-gradient-to-r from-[#80FF72] to-[#7EE8FA] text-black shadow-[0_0_15px_rgba(128,255,114,0.3)] hover:shadow-[0_0_20px_rgba(128,255,114,0.4)]"
                          : "bg-white/10 border border-green-700/30 text-gray-200 hover:bg-[#80FF72]/20 hover:border-[#80FF72]/50"
                      }`}
                    >
                      {isDone ? "✓" : "Done"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Motivational Footer */}
        <div className="mt-16 text-center">
          <p className="text-lg font-semibold text-gray-300 mb-2">
              💪 {accurateProgress === 100 ? "Amazing! You completed this week!" : "Keep pushing! Every rep counts."}
          </p>
      <p className="text-sm text-gray-500">
        {Math.max(0, activeWorkoutDays.length - completedActiveCount)} workouts remaining this week
      </p>
        </div>
      </main>
    </div>
  );
}
