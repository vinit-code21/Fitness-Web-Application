"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WorkoutPage() {
  const router = useRouter();

  const levels = [
    {
      name: "Beginner",
      path: "beginner",
      img: "/images/beginner.jpg",
      desc: "Perfect for those starting out. Focuses on form, basic movements, and building a fitness foundation.",
    },
    {
      name: "Intermediate",
      path: "intermediate",
      img: "/images/intermediate.jpg",
      desc: "A balanced program with moderate intensity to improve strength, endurance, and mobility.",
    },
    {
      name: "Advanced",
      path: "advanced",
      img: "/images/advanced.jpg",
      desc: "Challenging workouts for experienced individuals aiming for peak strength and conditioning.",
    },
  ];

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(levels[0]);
  }, []);

  const handleClick = (level) => {
    setSelected(level);
  };

  return (
    <div className="relative flex flex-col h-[calc(100vh-2rem)] bg-transparent text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-32 -left-24 w-72 h-72 bg-green-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -right-24 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />

      {/* Main Section */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 relative z-10">
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-6 text-center tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 drop-shadow-lg">
          Choose Your Workout Level
        </h1>

        {/* Level Cards */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 max-w-5xl w-full">
          {levels.map((level) => (
            <div
              key={level.name}
              onClick={() => handleClick(level)}
              className={`relative cursor-pointer rounded-2xl overflow-hidden h-[400px] shadow-lg border border-gray-800/80 transition-all duration-500 group hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] ${
                selected?.name === level.name
                  ? "border-green-400/60 ring-2 ring-green-400/40"
                  : "border-transparent"
              }`}
            >
              <img
                src={level.img}
                alt={level.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <h2 className="text-lg font-semibold text-white text-center tracking-wider drop-shadow-lg">
                  {level.name.toUpperCase()} LEVEL
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        {selected && (
          <div className="mt-6 w-full max-w-3xl bg-[#1A1A1A]/80 backdrop-blur-md border border-gray-800 rounded-2xl p-5 shadow-lg transition-all duration-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]">
            <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
              {selected.name} Workout Plan
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {selected.desc}
            </p>
            <button
              onClick={() => router.push(`/dashboard/workout/${selected.path}`)}
              className="w-full bg-gradient-to-r from-green-400 to-cyan-400 text-black font-semibold py-2 rounded-xl text-sm hover:from-green-500 hover:to-cyan-500 transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            >
              View Full Plan →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
