"use client";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import CountUp from "./CountUp";
import Sparkline from "./Sparkline";

export default function ProgressSection() {
  const [progress, setProgress] = useState([]);
  const [completedDays, setCompletedDays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const stored = typeof window !== "undefined" ? localStorage.getItem("fitnessUser") : null;
        const storedUser = stored ? JSON.parse(stored) : null;
        const email = storedUser?.email || (typeof window !== "undefined" ? localStorage.getItem("userEmail") : null);

        if (!email) {
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/dashboard?email=${encodeURIComponent(email)}`);
        const data = await res.json();

        if (data.success && data.data) {
          setCompletedDays(data.data.completedDays || []);
          setProgress(data.data.progress || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  // derived chart arrays and trends (computed from `progress`)
  const chartData = progress.map((p) => ({
    date: p.date,
    label: new Date(p.date).toLocaleDateString("en-US", { weekday: "short" }),
    calories: p.caloriesIntake || 0,
    workouts: p.workoutsCompleted || 0,
  }));

  const caloriesArr = chartData.map((c) => Number(c.calories) || 0);
  const workoutsArr = chartData.map((c) => Number(c.workouts) || 0);
  const labels = chartData.map((c) => c.label);

  // Filter out Sunday from the workouts bar chart (user requested)
  const barChartData = chartData.filter((c) => c.label !== "Sun");
  const barWorkoutsArr = barChartData.map((c) => Number(c.workouts) || 0);
  const barWorkoutsDomainMax = barWorkoutsArr.length ? Math.max(...barWorkoutsArr) : 1;

  const safePercent = (from, to) => {
    if (!from) return to ? 100 : 0;
    return Math.round(((to - from) / Math.abs(from)) * 100);
  };

  const caloriesTrend = caloriesArr.length > 1 ? safePercent(caloriesArr[0], caloriesArr[caloriesArr.length - 1]) : 0;
  const workoutsTrend = workoutsArr.length > 1 ? safePercent(workoutsArr[0], workoutsArr[workoutsArr.length - 1]) : 0;
  const avgCalories = Math.round((caloriesArr.reduce((a, b) => a + b, 0) || 0) / (caloriesArr.length || 1));
  const totalWorkouts = workoutsArr.reduce((a, b) => a + b, 0);
  const latestCalories = caloriesArr.length ? caloriesArr[caloriesArr.length - 1] : 0;
  // compute safe chart domains so charts don't collapse when values are all zero or very small
  const caloriesMax = caloriesArr.length ? Math.max(...caloriesArr) : 0;
  const caloriesDomainMax = Math.max(Math.ceil(caloriesMax * 1.2), caloriesMax === 0 ? 10 : caloriesMax);
  const workoutsMax = workoutsArr.length ? Math.max(...workoutsArr) : 0;
  const workoutsDomainMax = Math.max(workoutsMax, 1);

  // composite overall score (normalize calories & workouts to domain then average)
  const overallArr = chartData.map((c) => {
    const calNorm = caloriesDomainMax ? Number(c.calories) / caloriesDomainMax : 0;
    const wNorm = workoutsDomainMax ? Number(c.workouts) / workoutsDomainMax : 0;
    return Math.round(((calNorm + wNorm) / 2) * 100);
  });
  const overallScore = overallArr.length ? overallArr[overallArr.length - 1] : 0;
  const overallTrend = overallArr.length > 1 ? safePercent(overallArr[0], overallArr[overallArr.length - 1]) : 0;
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#050607] via-[#081014] to-[#030405]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-t-green-400 border-gray-800 animate-spin" />
          <div className="text-gray-300">Loading dashboard…</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050607] via-[#081014] to-[#030405] p-6 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-7xl mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-extrabold text-white">Fitness Dashboard</h1>
        <div className="text-sm text-gray-400">Welcome back — track your progress and trends</div>
      </div>

      {/* KPI row */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#0b1112]/60 border border-green-700/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div>
              <div className="text-sm text-gray-300">Avg Calories</div>
              <div className="text-2xl font-bold text-white"><CountUp end={avgCalories} /> kcal</div>
            </div>
            <Sparkline data={caloriesArr.slice(-7)} />
          </div>
          <div className={`text-sm font-semibold flex items-center gap-2 ${caloriesTrend >= 0 ? "text-green-400" : "text-red-400"}`}>
            {caloriesTrend >= 0 ? "▲" : "▼"} {Math.abs(caloriesTrend)}%
          </div>
        </div>

        <div className="bg-[#0b1112]/60 border border-green-700/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div>
              <div className="text-sm text-gray-300">Total Workouts</div>
              <div className="text-2xl font-bold text-white"><CountUp end={totalWorkouts} /></div>
            </div>
            <Sparkline data={workoutsArr.slice(-7)} color="#7EE8FA" />
          </div>
          <div className={`text-sm font-semibold flex items-center gap-2 ${workoutsTrend >= 0 ? "text-green-400" : "text-red-400"}`}>
            {workoutsTrend >= 0 ? "▲" : "▼"} {Math.abs(workoutsTrend)}%
          </div>
        </div>

        {/* Right-side overall score card */}
        <div className="bg-[#0b1112]/60 border border-green-700/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div>
              <div className="text-sm text-gray-300">Overall Score</div>
              <div className="text-2xl font-bold text-white"><CountUp end={overallScore} />%</div>
            </div>
            <Sparkline data={overallArr.slice(-7)} color="#C084FC" />
          </div>
          <div className={`text-sm font-semibold flex items-center gap-2 ${overallTrend >= 0 ? "text-green-400" : "text-red-400"}`}>
            {overallTrend >= 0 ? "▲" : "▼"} {Math.abs(overallTrend)}%
          </div>
        </div>
      </div>
      {/* Charts: wider, modern cards (removed Completed Days section) */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#071214]/60 p-6 rounded-3xl shadow-lg border border-white/6">
          <h3 className="text-green-200 font-semibold mb-4">Calories Intake (last {labels.length} days)</h3>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 12, right: 12, left: 0, bottom: 12 }}>
                <defs>
                  <linearGradient id="calGradientX" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7EE8FA" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#80FF72" stopOpacity={0.04} />
                  </linearGradient>
                  <linearGradient id="calLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7EE8FA" stopOpacity={1} />
                    <stop offset="100%" stopColor="#80FF72" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 6" stroke="#061018" vertical={false} />
                <XAxis dataKey="label" stroke="#9CA3AF" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#9CA3AF" domain={[0, caloriesDomainMax]} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#071016", borderRadius: 8, border: "1px solid rgba(255,255,255,0.04)" }} formatter={(value) => [`${value} kcal`, "Calories"]} />
                <Area type="monotone" dataKey="calories" stroke={"none"} fill="url(#calGradientX)" />
                <Line type="monotone" dataKey="calories" stroke="url(#calLine)" strokeWidth={3} dot={{ r: 4, stroke: "#071014", strokeWidth: 2, fill: "#9FF7C6" }} activeDot={{ r: 6 }} strokeLinecap="round" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#071214]/60 p-6 rounded-3xl shadow-lg border border-white/6">
          <h3 className="text-green-200 font-semibold mb-4">Workouts Completed (last {barChartData.length} days)</h3>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 12, right: 12, left: 0, bottom: 12 }} barSize={20}>
                <defs>
                  <linearGradient id="barGradientX" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#80FF72" stopOpacity={0.95} />
                    <stop offset="100%" stopColor="#7EE8FA" stopOpacity={0.95} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 6" stroke="#061018" vertical={false} />
                <XAxis dataKey="label" stroke="#9CA3AF" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#9CA3AF" domain={[0, barWorkoutsDomainMax]} axisLine={false} tickLine={false} tickCount={barWorkoutsDomainMax > 5 ? 5 : barWorkoutsDomainMax + 1} tickFormatter={(v) => Math.round(v)} />
                <Tooltip contentStyle={{ backgroundColor: "#071016", borderRadius: 8, border: "1px solid rgba(255,255,255,0.04)" }} formatter={(value) => [value, "Workouts"]} />
                <Bar dataKey="workouts" fill="url(#barGradientX)" radius={[10, 10, 6, 6]} animationDuration={700} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      </div>
  );
}
