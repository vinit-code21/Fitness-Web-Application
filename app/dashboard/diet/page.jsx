"use client";
import { useState } from "react";

export default function DietPlanner() {
  const [calories, setCalories] = useState("");
  const [diet, setDiet] = useState("");
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMealPlan = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/diet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetCalories: calories, diet }),
      });

      const data = await res.json();
      if (res.ok) {
        setMealPlan(data);
      } else {
        alert("Failed to fetch meal plan: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-white flex items-center gap-2">
        🍽 Meal Planner
      </h1>

      {/* Input Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="number"
          placeholder="Target Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="p-3 rounded-lg bg-gray-900 text-white border border-gray-700 flex-1"
        />
        <select
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
          className="p-3 rounded-lg bg-gray-900 text-white border border-gray-700 flex-1"
        >
          <option value="">Any Diet</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="ketogenic">Keto</option>
          <option value="paleo">Paleo</option>
        </select>
        <button
          onClick={fetchMealPlan}
          className="bg-green-500 text-black font-semibold px-6 py-3 rounded-lg hover:bg-green-400 transition"
        >
          {loading ? "Loading..." : "Generate Plan"}
        </button>
      </div>

      {/* Meal Plan Section */}
      {mealPlan && (
        <div className="mt-10 space-y-6">
          {mealPlan.meals.map((meal, index) => (
            <div
              key={index}
              className="p-5 bg-gray-800 rounded-xl shadow-lg hover:scale-[1.02] transition"
            >
              <h2 className="text-2xl font-bold capitalize mb-2 text-green-400">
                {meal.type}
              </h2>
              <img
                src={meal.image}
                alt={meal.title}
                className="w-full h-56 object-cover rounded-lg mb-3"
              />
              <h3 className="text-lg font-semibold">{meal.title}</h3>
              <p className="text-gray-400 text-sm mt-1">
                ⏳ Ready in {meal.readyInMinutes} min | 🍽 Servings: {meal.servings}
              </p>
              <a
                href={meal.sourceUrl}
                target="_blank"
                className="text-green-400 hover:underline mt-3 inline-block"
              >
                📖 View Full Recipe →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
