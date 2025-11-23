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
    <div className="min-h-screen bg-gradient-to-b from-[#050607] via-[#081014] to-[#030405] text-white p-6 flex flex-col items-center">
      {/* Header Section */}
      <div className="w-full max-w-7xl mb-12 text-center">
        <h1 className="text-2xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-[#80FF72] via-[#7EE8FA] to-[#C084FC] bg-clip-text text-transparent">
          Yoga & Mindfulness
        </h1>
        <p className="text-gray-400 text-lg">Choose your perfect level to begin your journey to wellness and flexibility</p>
      </div>

      {/* Yoga Level Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 w-full max-w-7xl mb-10">
        {levels.map((level, idx) => (
          <div
            key={level.name}
            onClick={() => handleClick(level)}
            className={`relative cursor-pointer rounded-3xl overflow-hidden h-[250px] backdrop-blur-md transition-all duration-500 group transform ${
              selected?.name === level.name
                ? "ring-2 ring-[#80FF72] shadow-[0_0_30px_rgba(128,255,114,0.4)] scale-105"
                : "hover:scale-102 hover:shadow-[0_0_25px_rgba(128,255,114,0.2)]"
            }`}
            style={{
              background: "linear-gradient(135deg, rgba(11,17,18,0.8) 0%, rgba(7,18,20,0.6) 100%)",
              border: "1px solid rgba(128,255,114,0.1)",
            }}
          >
            <img
              src={level.img}
              alt={`${level.name} yoga`}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050607] via-black/50 to-transparent"></div>
            
            {/* Badge */}
            <div className="absolute top-4 right-4 z-20 bg-[#80FF72]/20 border border-[#80FF72]/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#80FF72]">
              Level {idx + 1}
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
              <h2 className="text-3xl font-extrabold mb-3 text-white group-hover:text-[#80FF72] transition-colors">
                {level.name}
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                {level.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Description & Action Box */}
      {selected && (
        <div className="w-full max-w-3xl animate-in fade-in-50 duration-300">
          <div className="bg-[#0b1112]/60 backdrop-blur-md border border-[#80FF72]/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(128,255,114,0.15)]">
            <div className="mb-6">
              <h3 className="text-2xl font-extrabold bg-gradient-to-r from-[#80FF72] to-[#7EE8FA] bg-clip-text text-transparent mb-2">
                {selected.name} Yoga Plan
              </h3>
              <div className="h-1 w-16 bg-gradient-to-r from-[#80FF72] to-[#7EE8FA] rounded-full"></div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {selected.desc}
            </p>
            <button
              onClick={() => router.push(`/dashboard/yoga/${selected.path}`)}
              className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-[#80FF72] to-[#7EE8FA] text-black hover:shadow-[0_0_25px_rgba(128,255,114,0.5)] hover:scale-105 transition-all duration-300"
            >
              🧘 Explore {selected.name} Poses
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
