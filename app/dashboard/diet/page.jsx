"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DietPage() {
  const router = useRouter();

  const levels = [
    {
      name: "GAIN",
      path: "gain",
      img: "/images/diet-gain.jpg",
      description:
        "A calorie surplus plan to help you build muscle and strength. Includes high protein meals and nutrient-dense snacks.",
    },
    {
      name: "MAINTAIN",
      path: "maintain",
      img: "/images/diet-maintain.jpg",
      description:
        "Balanced nutrition to keep your weight stable while supporting overall health and energy levels.",
    },
    {
      name: "LOOSE",
      path: "loose",
      img: "/images/diet-loose.jpg",
      description:
        "A calorie deficit diet focusing on fat loss while preserving lean muscle mass.",
    },
  ];

  const [selectedDiet, setSelectedDiet] = useState(null);

  // Default to first option (GAIN)
  useEffect(() => {
    setSelectedDiet(levels[0]);
  }, []);

  const handleClick = (level) => {
    setSelectedDiet(level);
  };

  const handleNavigate = () => {
    if (selectedDiet) {
      router.push(`/dashboard/diet/${selectedDiet.path}`);
    }
  };

  return (
    <div className="flex-1 bg-[#1B2A26] p-6 rounded-xl shadow-lg border border-gray-800">
      <h1 className="text-2xl font-bold mb-6 text-white">Choose Your Diet Plan</h1>

      {/* Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {levels.map((level) => (
          <div
            key={level.name}
            onClick={() => handleClick(level)}
            className={`relative cursor-pointer rounded-xl overflow-hidden h-[450px] group shadow-md hover:shadow-lg transition-shadow border-4 ${
              selectedDiet?.name === level.name
                ? "border-[#80FF72]"
                : "border-transparent"
            }`}
          >
            {/* Background Image */}
            <img
              src={level.img}
              alt={`${level.name} diet`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Text */}
            <div className="relative z-10 flex items-center justify-center h-full">
              <h2 className="text-lg font-extrabold text-white tracking-wider transform transition-transform duration-300 group-hover:scale-110">
                {level.name} DIET
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Section */}
      <div className="mt-6 w-full bg-[#24332E] p-6 rounded-lg border border-gray-600 min-h-[180px]">
        {selectedDiet ? (
          <div>
            <h3 className="text-xl font-bold mb-2 text-[#80FF72]">
              {selectedDiet.name} Diet Plan
            </h3>
            <p className="text-gray-300">{selectedDiet.description}</p>
            <button
              onClick={handleNavigate}
              className="mt-4 bg-[#80FF72] text-black px-4 py-2 rounded font-semibold hover:bg-[#6be965] transition"
            >
              View Full Plan
            </button>
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            Click on a diet plan above to see details here.
          </p>
        )}
      </div>
    </div>
  );
}
