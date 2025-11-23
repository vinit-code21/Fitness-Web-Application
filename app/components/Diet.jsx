"use client"; // ✅ Must be the very first line

import { useState } from "react";

export default function DietPlans() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [activity, setActivity] = useState(1.2);
  const [result, setResult] = useState(null);

  const toggleCalculator = () => {
    setShowCalculator(!showCalculator);
    setResult(null);
  };

  function calculateCalories(e) {
    e.preventDefault();
    if (!age || !weight || !height || !gender) {
      setResult("Please fill all fields");
      return;
    }
    let bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;
    const tdee = Math.round(bmr * activity);
    setResult({
      maintenance: tdee,
      loss: tdee - 500,
      gain: tdee + 500,
    });
  }

  const cards = [
    {
      title: "Weight Gain Diet",
      description: "High-calorie meal plans with balanced macros for healthy bulking.",
      image: "/images/gainDeit.jpg",
    },
    {
      title: "Weight Loss Diet",
      description: "Calorie deficit plans with nutrient-rich, low-carb food options.",
      image: "/images/looseDeit.jpg",
    },
    {
      title: "Maintenance Plan",
      description: "Steady calorie intake to maintain body weight & energy.",
      image: "/images/maintainDeit.jpg",
    },
  ];

  return (
    <section id="diet" className="py-20 bg-[#111] text-center relative">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 animate-text-fade">
        Diet Plans
      </h2>

      <div className="flex flex-wrap justify-center gap-10 px-4">
        {cards.map((card, i) => (
          <div
            key={i}
            className="relative w-[320px] h-[460px] rounded-2xl overflow-hidden group hover:scale-[1.03] transition-transform duration-500 shadow-2xl"
          >
            {/* Hover Glow */}
            <span className="absolute inset-0 rounded-2xl bg-[linear-gradient(315deg,#80FF72,#7EE8FA)] blur-3xl opacity-0 group-hover:opacity-80 transition-all duration-500 z-0"></span>

            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 z-10 transition-transform duration-500 group-hover:scale-105"></div>

            <div className="relative z-20 flex flex-col justify-end h-full p-6 text-white border border-white/10 rounded-2xl shadow-lg transition-transform duration-500">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 drop-shadow-lg">{card.title}</h3>
              <p className="text-sm md:text-base leading-relaxed drop-shadow-md">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Calorie Calculator Button */}
      <div className="mt-12">
        <button
          onClick={toggleCalculator}
          className="bg-gradient-to-r from-green-400 to-cyan-400 text-black font-bold px-6 py-3 rounded-2xl shadow-lg hover:shadow-2xl transition duration-500"
        >
          Try Calorie Calculator
        </button>
      </div>

      {/* Calculator Popup */}
      {showCalculator && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-md">
          <div className="bg-[#071012]/95 p-8 rounded-2xl shadow-2xl w-full max-w-md relative text-white border border-green-600/20 ring-1 ring-green-600/10">
            <button
              onClick={toggleCalculator}
              className="absolute top-3 right-4 text-white text-xl hover:text-red-400 transition"
              aria-label="Close calculator"
            >
              ✖
            </button>
            <h3 className="text-3xl font-bold mb-4 text-green-400">Calorie Calculator</h3>
            <form className="space-y-4 text-left" onSubmit={calculateCalories}>
              {/* Age */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path d="M6 2a1 1 0 011 1v1h6V3a1 1 0 112 0v1a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2V3a1 1 0 011-1z" />
                  </svg>
                </span>
                <input
                  type="number"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full p-3 pl-12 bg-gradient-to-b from-[#0b0d0e] to-[#0f1112] border border-green-700/30 rounded-2xl text-white placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 outline-none transition shadow-sm"
                />
              </div>

              {/* Weight */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M21 7h-6.586l-2-2H11L9 7H3v13a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1zM7 10a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </span>
                <input
                  type="number"
                  placeholder="Weight (kg)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-3 pl-12 bg-gradient-to-b from-[#0b0d0e] to-[#0f1112] border border-green-700/30 rounded-2xl text-white placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 outline-none transition shadow-sm"
                />
              </div>

              {/* Height */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M3 3h2v18H3V3zm4 0h2v18H7V3zm4 0h6v18h-6V3z" />
                  </svg>
                </span>
                <input
                  type="number"
                  placeholder="Height (cm)"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full p-3 pl-12 bg-gradient-to-b from-[#0b0d0e] to-[#0f1112] border border-green-700/30 rounded-2xl text-white placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 outline-none transition shadow-sm"
                />
              </div>

              {/* Gender select with custom caret */}
              <div className="relative">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  aria-label="Select Gender"
                  className="appearance-none w-full p-3 bg-[#0f1112] border border-green-600 rounded-2xl text-green-300 focus:ring-2 focus:ring-green-500 outline-none transition shadow-sm"
                >
                  <option value="" disabled className="text-black bg-white">Select Gender</option>
                  <option value="male" className="text-black bg-white">Male</option>
                  <option value="female" className="text-black bg-white">Female</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-green-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>

              {/* Activity level select with custom caret */}
              <div className="relative">
                <select
                  value={activity}
                  onChange={(e) => setActivity(Number(e.target.value))}
                  aria-label="Select Activity Level"
                  className="appearance-none w-full p-3 bg-[#0f1112] border border-green-600 rounded-2xl text-green-300 focus:ring-2 focus:ring-green-500 outline-none transition shadow-sm"
                >
                  <option value={1.2} className="text-black bg-white">Sedentary</option>
                  <option value={1.375} className="text-black bg-white">Light</option>
                  <option value={1.55} className="text-black bg-white">Moderate</option>
                  <option value={1.725} className="text-black bg-white">Active</option>
                  <option value={1.9} className="text-black bg-white">Very Active</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-green-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-400 to-green-500 text-black py-3 rounded-2xl font-bold hover:scale-[1.02] transition shadow-lg"
              >
                Calculate
              </button>
            </form>

            {result && typeof result === "string" && (
              <p className="mt-4 text-red-400 text-center font-semibold">{result}</p>
            )}
            {result && typeof result === "object" && (
              <div className="mt-4 text-center space-y-2">
                <p className="text-green-400 font-semibold">Maintenance: {result.maintenance} kcal/day</p>
                <p className="text-red-400 font-semibold">Weight Loss: {result.loss} kcal/day</p>
                <p className="text-blue-400 font-semibold">Weight Gain: {result.gain} kcal/day</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
