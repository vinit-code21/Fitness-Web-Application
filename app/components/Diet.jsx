"use client";

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

  // Accurate Mifflin–St Jeor formula
  function calculateCalories(e) {
    e.preventDefault();

    if (!age || !weight || !height || !gender) {
      setResult("Please fill all fields");
      return;
    }

    let bmr;
    if (gender === "male") {
      bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + 5;
    } else {
      bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) - 161;
    }

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
      description:
        "High-calorie meal plans with balanced macros for healthy bulking.",
      image: "/images/gainDeit.jpg",
    },
    {
      title: "Weight Loss Diet",
      description:
        "Calorie deficit plans with nutrient-rich, low-carb food options.",
      image: "/images/looseDeit.jpg",
    },
    {
      title: "Maintenance Plan",
      description:
        "Steady calorie intake to maintain body weight & energy.",
      image: "/images/maintainDeit.jpg",
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

            {/* Image as background */}
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black/50 z-10 transition-transform duration-300 group-hover:scale-105"></div>

            {/* Card Content */}
            <div className="relative z-20 flex flex-col justify-end h-full p-6 text-white border border-white/10 rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105">
              <h3 className="text-2xl font-bold mb-3 drop-shadow-lg">
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed drop-shadow-md">
                {card.description}
              </p>
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
        <div className="fixed inset-0 flex items-center justify-center z-50">
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
            <form
              className="space-y-4 text-left text-celeste"
              onSubmit={calculateCalories}
            >


              <input
                type="number"
                placeholder="Age"
                value={age}
                min={10}
                max={100}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-2 bg-white/10 border border-white/10 rounded text-white placeholder:text-white/70"
              />
              <input
                type="number"
                placeholder="Weight (kg)"
                value={weight}
                min={30}
                max={200}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-2 bg-white/10 border border-white/10 rounded text-white placeholder:text-white/70"
              />
              <input
                type="number"
                placeholder="Height (cm)"
                value={height}
                min={120}
                max={230}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full p-2 bg-white/10 border border-white/10 rounded text-white placeholder:text-white/70"
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                style={{ backgroundColor: "#2E3C36" }}
                className="w-full p-2 bg-white/10 border border-white/10 rounded text-white"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <select
                className="w-full p-2 bg-white/10 border border-white/10 rounded text-white"
                style={{ backgroundColor: "#2E3C36" }}
                value={activity}
                onChange={(e) => setActivity(Number(e.target.value))}
              >
                <option value={1.2}>Sedentary (little or no exercise)</option>
                <option value={1.375}>Light (light exercise 1-3 days/week)</option>
                <option value={1.55}>Moderate (moderate exercise 3-5 days/week)</option>
                <option value={1.725}>Active (hard exercise 6-7 days/week)</option>
                <option value={1.9}>Very Active (very hard exercise & physical job)</option>
              </select>

              <button
                type="submit"
                className="w-full bg-[#80FF72] text-black py-2 rounded font-bold"
              >
                Calculate
              </button>
            </form>

            {result && typeof result === "string" && (
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold text-red-400">{result}</p>
              </div>
            )}

            {result && typeof result === "object" && (
              <div className="mt-4 text-center space-y-2">
                <p className="text-lg font-semibold text-[#80FF72]">
                  Maintenance Calories: {result.maintenance} kcal/day
                </p>
                <p className="text-lg font-semibold text-red-400">
                  Weight Loss: {result.loss} kcal/day
                </p>
                <p className="text-lg font-semibold text-blue-400">
                  Weight Gain: {result.gain} kcal/day
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
