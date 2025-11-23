"use client";

import { useState } from "react";
import { mealImage } from "../../lib/imageHelper";
import RecipeModal from "./RecipeModal";

export default function DietPlanner() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weightGoal: "",
    dietType: "",
    mealCount: 3,
    activityLevel: "",
    calories: "",
    bodyType: "",
  });

  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openMeal, setOpenMeal] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchMealPlan = async () => {
    setLoading(true);
    setErrorMessage("");
    setMealPlan(null);

    try {
      const res = await fetch("/api/diet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.meals?.length) {
        setMealPlan(data);
      } else {
        setErrorMessage(
          data.error || "No meals found. Try adjusting preferences."
        );
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center text-white pt-10 pb-10">

      {/* Glow background */}
      <div className="absolute -top-32 left-0 w-[500px] h-[300px] bg-green-500/10 blur-3xl rounded-full"></div>
      <div className="absolute top-20 right-0 w-[500px] h-[300px] bg-cyan-500/10 blur-3xl rounded-full"></div>

      {/* Heading */}
      <h1 className="text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
        🥗 Personalized Meal Planner
      </h1>

      {/* Input Section */}
      <div className="
        grid grid-cols-1 md:grid-cols-4 gap-4 
        w-[90%] max-w-6xl 
        bg-black/40 backdrop-blur-xl 
        border border-white/10 
        shadow-xl 
        p-6 rounded-3xl
      ">
        {[
          { type: "number", name: "age", placeholder: "Age" },
          { select: true, name: "gender", options: ["male", "female", "other"] },
          { select: true, name: "weightGoal", options: ["lose", "maintain", "gain"] },
          { select: true, name: "dietType", options: ["vegetarian", "vegan", "keto", "paleo"] },
          { type: "number", name: "mealCount", placeholder: "Meals Per Day" },
          { select: true, name: "activityLevel", options: ["low", "moderate", "high"] },
          { type: "number", name: "calories", placeholder: "Target Calories" },
          { select: true, name: "bodyType", options: ["ecto", "meso", "endo"] },
        ].map((input, idx) =>
          input.select ? (
            <select
              key={idx}
              name={input.name}
              value={formData[input.name]}
              onChange={handleChange}
              className="p-3 rounded-xl bg-black/50 border border-white/10 text-white focus:border-green-400 outline-none"
            >
              <option value="">
                {input.name.charAt(0).toUpperCase() + input.name.slice(1)}
              </option>
              {input.options.map((o) => (
                <option className="bg-black" key={o} value={o}>
                  {o.charAt(0).toUpperCase() + o.slice(1)}
                </option>
              ))}
            </select>
          ) : (
            <input
              key={idx}
              type={input.type}
              name={input.name}
              value={formData[input.name]}
              onChange={handleChange}
              placeholder={input.placeholder}
              className="p-3 rounded-xl bg-black/50 border border-white/10 text-white focus:border-green-400 outline-none"
            />
          )
        )}
      </div>

      {/* Button */}
      <div className="w-full flex justify-center">
        <button
          type="button"
          onClick={fetchMealPlan}
          disabled={loading}
          aria-busy={loading}
          className="mt-6 px-10 py-3 text-lg font-semibold rounded-xl text-black
            bg-gradient-to-r from-green-400 to-cyan-400
            hover:shadow-[0_0_20px_rgba(0,255,200,0.5)]
            transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Meal Plan"}
        </button>
      </div>

      {/* Meal Cards */}
      {mealPlan && (
        <div className="mt-10 w-[90%] max-w-6xl">
          <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
            Total Calories: {mealPlan.totalCalories} kcal
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {mealPlan.meals.map((meal, i) => (
              <div
                key={i}
                className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition"
              >
                <img
                  src={meal.image || mealImage("diet", meal)}
                  alt={meal.title}
                  className="w-full h-44 object-cover"
                  onError={(e) => {
                    e.target.src = "/images/placeholder.svg";
                  }}
                />

                <div className="p-4">
                  <h3 className="text-green-400 text-lg font-bold">{meal.type}</h3>
                  <p className="font-semibold mt-1">{meal.title}</p>
                  <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                    {meal.description}
                  </p>

                  <p className="text-gray-300 text-sm mt-2">
                    🔥 {meal.calories} kcal | ⏱ {meal.readyInMinutes} min
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    
                    <button
                      onClick={() => setOpenMeal(meal)}
                      className="px-3 py-1 bg-gradient-to-r from-[#80FF72] to-[#7EE8FA] rounded text-black text-sm font-semibold"
                    >
                      View Recipe
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {openMeal && (
        <RecipeModal
          meal={openMeal}
          onClose={() => setOpenMeal(null)}
        />
      )}
    </div>
  );
}
