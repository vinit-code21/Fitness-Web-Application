"use client";

import { useState } from "react";


export default function DietPlans() {
  const [showCalculator, setShowCalculator] = useState(false);

  const toggleCalculator = () => setShowCalculator(!showCalculator);

  const cards = [
    {
      title: "Weight Gain Diet",
      description: "High-calorie meal plans with balanced macros for healthy bulking.",
      image: "/IMAGES/gainDeit.jpg",
    },
    {
      title: "Weight Loss Diet",
      description: "Calorie deficit plans with nutrient-rich, low-carb food options.",
      image: "/IMAGES/looseDeit.jpg",
    },
    {
      title: "Maintenance Plan",
      description: "Steady calorie intake to maintain body weight & energy.",
      image: "/IMAGES/maintainDeit.jpg",
    },
  ];

  return (
    <section id="diet" className="py-16 bg-[#2E3C36] text-center">
      <h2 className="text-3xl font-bold mb-8 text-[#80FF72]">Diet Plans</h2>

      <div className="flex justify-center flex-wrap gap-10 px-4">
        {cards.map((card, i) => (
          <div
            key={i}
            className="relative w-[320px] h-[460px] rounded-xl overflow-hidden transition-all duration-500 group"
          >
            {/* Glowing green hover gradient */}
            <span className="absolute inset-0 rounded-xl bg-[linear-gradient(315deg,#80FF72,#7EE8FA)] blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 z-0"></span>

            {/* Card Content */}
            <div className="relative z-10 w-full h-full p-6 bg-white/5 backdrop-blur-lg text-white border border-white/10 rounded-xl shadow-lg group-hover:scale-105 transition-all duration-300">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
              <p className="text-sm leading-relaxed">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Calorie Calculator Button */}
      <div className="mt-10">
        <button
          onClick={toggleCalculator}
          className="bg-gradient-to-r from-[#80FF72] to-[#7EE8FA] text-black font-bold px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition"
        >
          Try Calorie Calculator
        </button>
      </div>

      {/* Calorie Calculator Popup */}
      {showCalculator && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1f2925] p-8 rounded-lg shadow-2xl w-full max-w-md relative">
            <button
              onClick={toggleCalculator}
              className="absolute top-2 right-3 text-white text-xl"
            >
              ✖
            </button>
            <h3 className="text-2xl font-semibold mb-4 text-[#80FF72]">
              Calorie Calculator
            </h3>
            <form className="space-y-4 text-left text-celeste">
              <input
                type="number"
                placeholder="Age"
                className="w-full p-2 bg-white/10 border border-white/10 rounded"
              />
              <input
                type="number"
                placeholder="Weight (kg)"
                className="w-full p-2 bg-white/10 border border-white/10 rounded"
              />
              <input
                type="number"
                placeholder="Height (cm)"
                className="w-full p-2 bg-white/10 border border-white/10 rounded"
              />
              <select className="w-full p-2 bg-white/10 border border-white/10 rounded">
                <option>Activity Level</option>
                <option>Sedentary</option>
                <option>Light</option>
                <option>Moderate</option>
                <option>Active</option>
                <option>Very Active</option>
              </select>
              <button
                type="submit"
                className="w-full bg-[#80FF72] text-black py-2 rounded font-bold"
              >
                Calculate
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
