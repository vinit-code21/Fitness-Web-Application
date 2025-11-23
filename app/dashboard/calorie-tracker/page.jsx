"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  PlusIcon,
  TrashIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

export default function CalorieTrackerPage() {
  const router = useRouter();
  const API_KEY = "ejBKJGfD718IGeHgXVV5xQ==avuTvWD0kJuRzNWk";

  const foodCategories = [
    "All", "Breakfast", "Lunch", "Dinner", "Snacks", "Fruits", "Vegetables", "Proteins", "Other",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todaysMeals, setTodaysMeals] = useState([]);
  const [dailyGoal, setDailyGoal] = useState(2200);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [goalInput, setGoalInput] = useState(2200);
  const [showQtyModal, setShowQtyModal] = useState(false);
  const [qtyInput, setQtyInput] = useState(100);
  const [qtySelectedFood, setQtySelectedFood] = useState(null);
  const [user, setUser] = useState(null);

  // Load user
  useEffect(() => {
    const storedUser = localStorage.getItem("fitnessUser");
    if (!storedUser) {
      router.replace("/login");
      return;
    }

    try {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);

      // Fetch canonical user details (includes dailyGoal if saved)
      (async () => {
        try {
          const res = await fetch(`/api/userdetails?email=${encodeURIComponent(parsed.email)}`);
          const body = await res.json();
          if (body.success && body.user) {
            const dg = body.user.dailyGoal ?? body.user.dailygoal ?? parsed.dailyGoal ?? 2200;
            const num = Number(dg) || 2200;
            setDailyGoal(num);
            setGoalInput(num);
          }
        } catch (err) {
          // non-fatal, keep defaults
          console.error("Could not fetch user details for dailyGoal:", err);
        }
      })();
    } catch {
      router.replace("/login");
    }
  }, [router]);

  // Load meals
  useEffect(() => {
    if (!user) return;
    const fetchMeals = async () => {
      try {
        const res = await fetch(`/api/meals?email=${user.email}&date=${getDateKey(currentDate)}`);
        const data = await res.json();
        if (data.success) setTodaysMeals(data.meals);
      } catch (err) {
        console.error("Error loading meals:", err);
      }
    };
    fetchMeals();
  }, [user, currentDate]);

  const getDateKey = (date) => date.toISOString().split("T")[0];

  // Add a meal with specified quantity (grams)
  async function addToMeals(food, quantity = 100) {
    if (!user) return alert("Please log in first");
    try {
      const qty = Number(quantity) || 100;
      // calculate calories proportionally (assume food.calories per 100g)
      const calories = Math.round(((food.calories || 0) * qty) / 100);

      const meal = {
        userEmail: user.email,
        name: food.name,
        calories: calories,
        quantity: qty,
        category: selectedCategory,
        date: getDateKey(currentDate),
      };
      const res = await fetch("/api/meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meal),
      });
      const data = await res.json();
      if (data.success) setTodaysMeals((prev) => [data.meal, ...prev]);
      // notify other parts of the app (dashboard) to refresh progress
      try {
        window.dispatchEvent(new Event("progressUpdated"));
      } catch (err) {
        console.warn("Could not dispatch progressUpdated event:", err);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function openQtyModal(food) {
    setQtySelectedFood(food);
    // default to 100g or keep previous input
    setQtyInput(100);
    setShowQtyModal(true);
  }

  async function confirmAddWithQty() {
    if (!qtySelectedFood) return;
    const qty = Number(qtyInput) || 100;
    if (qty <= 0) return alert("Please enter a valid quantity in grams");
    await addToMeals(qtySelectedFood, qty);
    setShowQtyModal(false);
    setQtySelectedFood(null);
  }

  async function removeMeal(id) {
    try {
      await fetch("/api/meals", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setTodaysMeals((prev) => prev.filter((m) => m._id !== id));
      // notify dashboard to refresh
      try {
        window.dispatchEvent(new Event("progressUpdated"));
      } catch (err) {
        console.warn("Could not dispatch progressUpdated event:", err);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const goToPrevDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 1);
    setCurrentDate(d);
  };

  const goToNextDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 1);
    setCurrentDate(d);
  };

  async function handleSearch() {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(searchTerm)}`,
        { headers: { "X-Api-Key": API_KEY } }
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      const formattedFoods = data.items.map((item, idx) => ({
        id: idx + 1,
        name: item.name,
        serving: `${item.serving_size_g} g`,
        calories: Math.round(item.calories),
        category: "Other",
      }));
      setFoods(formattedFoods);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function saveDailyGoal() {
    setDailyGoal(goalInput);
    setShowGoalModal(false);
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, dailyGoal: goalInput }),
      });
      const body = await res.json();
      if (body.success) {
        // update localStorage so UI parts using fitnessUser see the new goal immediately
        try {
          const stored = localStorage.getItem("fitnessUser");
          if (stored) {
            const parsed = JSON.parse(stored);
            parsed.dailyGoal = goalInput;
            localStorage.setItem("fitnessUser", JSON.stringify(parsed));
            setUser(parsed);
          }
        } catch (err) {
          console.warn("Could not update localStorage fitnessUser:", err);
        }
        // notify dashboard to refresh and pick up new calorie goal
        try {
          window.dispatchEvent(new Event("progressUpdated"));
        } catch (err) {
          console.warn("Could not dispatch progressUpdated event:", err);
        }
      } else {
        console.warn("Failed to save daily goal:", body.error || body.message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const totalCalories = todaysMeals.reduce((sum, m) => sum + m.calories, 0);
  const remainingCalories = dailyGoal - totalCalories;
  const filteredFoods =
    selectedCategory === "All" ? foods : foods.filter((f) => f.category === selectedCategory);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f1815] text-white">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] w-full bg-[#0f1815] text-white p-6 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#80FF72] to-[#7EE8FA] bg-clip-text text-transparent">
          Hello, {user.name || user.email.split("@")[0]} 👋
        </h1>
        <p className="text-gray-400 text-sm">Track your calories and stay on goal!</p>
      </div>

      {/* Stats */}
      <div className="bg-white/10 backdrop-blur-md border border-[#80FF72]/30 rounded-2xl p-5 mb-4">
        <div className="flex justify-between items-center mb-2">
          <button onClick={goToPrevDay} className="p-2 hover:bg-white/10 rounded-lg">
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h2 className="text-base font-semibold">
            {currentDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h2>
          <button onClick={goToNextDay} className="p-2 hover:bg-white/10 rounded-lg">
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="bg-[#1B2A26] p-3 rounded-xl flex justify-between items-center shadow-[0_0_10px_rgba(128,255,114,0.2)]">
            <div>
              <h3 className="font-semibold text-gray-300">Goal</h3>
              <p className="text-xl font-bold text-[#80FF72]">{dailyGoal}</p>
            </div>
            <button onClick={() => setShowGoalModal(true)}>
              <Cog6ToothIcon className="h-5 w-5 text-[#80FF72]" />
            </button>
          </div>

          <div className="bg-[#1B2A26] p-3 rounded-xl text-center shadow-[0_0_10px_rgba(126,232,250,0.2)]">
            <h3 className="font-semibold text-gray-300">Consumed</h3>
            <p className="text-xl font-bold text-[#7EE8FA]">{totalCalories}</p>
          </div>

          <div
            className={`p-3 rounded-xl text-center ${
              remainingCalories >= 0
                ? "bg-[#1B2A26]"
                : "bg-red-900 shadow-[0_0_10px_rgba(255,0,0,0.4)]"
            }`}
          >
            <h3 className="font-semibold text-gray-300">Remaining</h3>
            <p
              className={`text-xl font-bold ${
                remainingCalories >= 0 ? "text-[#80FF72]" : "text-red-400"
              }`}
            >
              {remainingCalories}
            </p>
          </div>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-2 mt-3 overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              totalCalories > dailyGoal ? "bg-red-500" : "bg-[#80FF72]"
            }`}
            style={{ width: `${Math.min((totalCalories / dailyGoal) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Two Panels */}
      <div className="grid grid-cols-2 gap-5 flex-1 overflow-hidden">
        {/* Left */}
        <div className="bg-white/10 backdrop-blur-md border border-[#80FF72]/20 rounded-2xl p-4 flex flex-col overflow-hidden">
          <h2 className="text-lg font-semibold mb-3 text-[#80FF72]">Add Food</h2>
          <div className="flex mb-3">
            <div className="relative flex-grow">
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search foods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-8 pr-3 py-2 bg-[#1B2A26] rounded-lg text-sm text-white placeholder-gray-400"
              />
            </div>
            <button
              onClick={handleSearch}
              className="ml-2 px-3 py-2 bg-gradient-to-r from-[#80FF72] to-[#7EE8FA] text-black font-semibold text-sm rounded-lg hover:scale-105 transition-transform"
            >
              Search
            </button>
          </div>

          <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700 text-xs">
            {foodCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-[#80FF72] to-[#7EE8FA] text-black"
                    : "bg-[#1B2A26] text-gray-300 hover:bg-[#80FF72] hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-700 pr-1">
                  {loading ? (
              <p className="text-center text-gray-400">Loading...</p>
            ) : filteredFoods.length ? (
              filteredFoods.map((food) => (
                <div
                  key={food.id}
                  className="flex justify-between items-center bg-[#1B2A26] p-2 rounded-lg hover:bg-white/10"
                >
                  <div>
                    <h3 className="text-sm font-medium capitalize">{food.name}</h3>
                    <p className="text-xs text-gray-400">{food.serving}</p>
                    <p className="text-xs text-gray-500">{food.calories} cal / 100g</p>
                  </div>
                  <button
                    onClick={() => openQtyModal(food)}
                    className="p-1 text-[#80FF72] hover:bg-[#2E3C36] rounded-full"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No foods found</p>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="bg-white/10 backdrop-blur-md border border-[#80FF72]/20 rounded-2xl p-4 flex flex-col overflow-hidden">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-[#80FF72]">Today's Meals</h2>
            <span className="text-xs text-gray-400">{todaysMeals.length} items</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-700 pr-1">
            {todaysMeals.length ? (
              todaysMeals.map((meal) => (
                <div
                  key={meal._id}
                  className="flex justify-between items-center bg-[#1B2A26] p-2 rounded-lg hover:bg-white/10"
                >
                  <div>
                    <h3 className="text-sm font-medium capitalize">{meal.name}</h3>
                    <p className="text-xs text-gray-400">{meal.calories} cal</p>
                  </div>
                  <button
                    onClick={() => removeMeal(meal._id)}
                    className="p-1 text-red-400 hover:bg-red-900 rounded-full"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No meals added yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-[#1B2A26] p-6 rounded-xl border border-[#80FF72]/30 shadow-[0_0_25px_rgba(128,255,114,0.3)] w-80">
            <h2 className="text-lg font-bold mb-4 text-[#80FF72]">Set Daily Goal</h2>
            <input
              type="number"
              value={goalInput}
              onChange={(e) => setGoalInput(Number(e.target.value))}
              className="w-full p-2 mb-4 bg-white/10 text-white rounded-lg"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowGoalModal(false)}
                className="px-4 py-2 bg-gray-600 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={saveDailyGoal}
                className="px-4 py-2 bg-gradient-to-r from-[#80FF72] to-[#7EE8FA] text-black font-semibold rounded-lg hover:scale-105 transition-transform"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quantity Modal (Add food quantity) */}
      {showQtyModal && qtySelectedFood && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-[#1B2A26] p-6 rounded-xl border border-[#80FF72]/30 shadow-[0_0_25px_rgba(128,255,114,0.3)] w-80">
            <h2 className="text-lg font-bold mb-4 text-[#80FF72]">Add {qtySelectedFood.name}</h2>
            <label className="text-sm text-gray-300 mb-2 block">Quantity (grams)</label>
            <input
              type="number"
              value={qtyInput}
              onChange={(e) => setQtyInput(Number(e.target.value))}
              className="w-full p-2 mb-4 bg-white/10 text-white rounded-lg"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowQtyModal(false);
                  setQtySelectedFood(null);
                }}
                className="px-4 py-2 bg-gray-600 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmAddWithQty}
                className="px-4 py-2 bg-gradient-to-r from-[#80FF72] to-[#7EE8FA] text-black font-semibold rounded-lg hover:scale-105 transition-transform"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
