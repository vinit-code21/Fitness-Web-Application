"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function YogaPage() {
  const router = useRouter();
  const levels = [
    {
      name: "Beginner",
      path: "beginner",
      img: "/images/yoga-beginner.jpg",
      desc: "Gentle poses for flexibility, balance, and relaxation. Ideal for those new to yoga.",
    },
    {
      name: "Intermediate",
      path: "intermediate",
      img: "/images/yoga-intermediate.jpg",
      desc: "A mix of strength, flexibility, and mindfulness. Builds upon foundational yoga practices.",
    },
    {
      name: "Advanced",
      path: "advanced",
      img: "/images/yoga-advanced.jpg",
      desc: "Challenging poses and flows for experienced practitioners aiming to deepen their practice.",
    },
  ];

  const [selected, setSelected] = useState(null);

  // Default select Beginner
  useEffect(() => {
    setSelected(levels[0]);
  }, []);

  const handleClick = (level) => {
    setSelected(level);
  };

  return (
    <div className="flex-1 bg-[#1B2A26] p-6 rounded-xl shadow-lg border border-gray-800">
      <h1 className="text-2xl font-bold mb-6 text-white text-center">
        Choose Your Yoga Level
      </h1>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
        {levels.map((level) => (
          <div
            key={level.name}
            onClick={() => handleClick(level)}
            className={`relative cursor-pointer rounded-xl overflow-hidden h-[450px] group shadow-md hover:shadow-lg transition-shadow border-4 ${
              selected?.name === level.name
                ? "border-[#80FF72]"
                : "border-transparent"
            }`}
          >
            <img
              src={level.img}
              alt={`${level.name} yoga`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <h2 className="text-lg font-extrabold text-white tracking-wider">
                {level.name.toUpperCase()} LEVEL
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      {selected && (
        <div className="mt-6 bg-[#243832] p-4 rounded-lg border border-gray-700">
          <h3 className="text-[#80FF72] text-lg font-bold">
            {selected.name} Yoga Plan
          </h3>
          <p className="text-gray-300 mt-1">{selected.desc}</p>
          <button
            onClick={() => router.push(`/dashboard/yoga/${selected.path}`)}
            className="mt-4 bg-[#80FF72] text-black font-semibold py-2 px-4 rounded-lg"
          >
            View Full Plan
          </button>
        </div>
      )}
    </div>
  );
}
