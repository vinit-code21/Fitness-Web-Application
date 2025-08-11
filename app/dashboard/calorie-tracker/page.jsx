"use client";

import { useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

export default function CalorieTrackerPage() {
  const dailyGoal = 2200;
  const totalCalories = 1350;
  const remainingCalories = dailyGoal - totalCalories;

  const foodCategories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snacks",
    "Fruits",
    "Vegetables",
    "Proteins",
    "Other",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const foods = [
    { id: 1, name: "Apple", serving: "1 medium", calories: 95, category: "Fruits" },
    { id: 2, name: "Chicken Breast", serving: "100g", calories: 165, category: "Proteins" },
    { id: 3, name: "Oatmeal", serving: "1 cup", calories: 150, category: "Breakfast" },
  ];

  const todaysMeals = [
    { id: 1, name: "Banana", serving: "1 medium", calories: 105 },
    { id: 2, name: "Grilled Salmon", serving: "150g", calories: 280 },
  ];

  const filteredFoods =
    selectedCategory === "All"
      ? foods
      : foods.filter((f) => f.category === selectedCategory);

  return (
    <div className="bg-[#1B2A26] min-h-screen w-full p-6 overflow-y-auto">
      {/* Date Navigation */}
      <div className="bg-[#2E3C36] rounded-lg p-4 flex justify-between items-center mb-6">
        <button className="p-2 hover:bg-[#1B2A26] rounded-lg">
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <h2 className="font-semibold text-center text-lg">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>
        <button className="p-2 hover:bg-[#1B2A26] rounded-lg">
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Calorie Summary */}
      <div className="bg-[#2E3C36] rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Daily Goal */}
          <div className="bg-[#1B2A26] p-4 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Daily Goal</h3>
              <p className="text-2xl font-bold text-[#80FF72]">{dailyGoal} cal</p>
            </div>
            <Cog6ToothIcon className="h-5 w-5 text-[#80FF72]" />
          </div>

          {/* Consumed */}
          <div className="bg-[#1B2A26] p-4 rounded-lg">
            <h3 className="font-semibold">Consumed</h3>
            <p className="text-2xl font-bold text-[#7EE8FA]">{totalCalories} cal</p>
          </div>

          {/* Remaining */}
          <div
            className={`p-4 rounded-lg ${
              remainingCalories >= 0 ? "bg-[#1B2A26]" : "bg-red-900"
            }`}
          >
            <h3 className="font-semibold">Remaining</h3>
            <p
              className={`text-2xl font-bold ${
                remainingCalories >= 0 ? "text-[#80FF72]" : "text-red-400"
              }`}
            >
              {remainingCalories} cal
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-2.5 rounded-full transition-all duration-300 ${
              totalCalories > dailyGoal ? "bg-red-500" : "bg-[#80FF72]"
            }`}
            style={{
              width: `${Math.min((totalCalories / dailyGoal) * 100, 100)}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Main Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Food */}
        <div className="bg-[#2E3C36] rounded-lg p-6 flex flex-col h-[calc(100vh-280px)]">
          <h2 className="text-xl font-bold mb-4">Add Food</h2>

          {/* Search */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search foods..."
              className="w-full p-2 pl-10 rounded-lg bg-[#1B2A26] text-white placeholder-gray-400"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>

          {/* Categories */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-600">
            {foodCategories.map((cat) => (
              <button
                key={cat}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-[#80FF72] text-black"
                    : "bg-[#1B2A26] text-gray-300 hover:bg-[#80FF72] hover:text-black"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Foods List */}
          <div className="grid gap-3 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-600">
            {filteredFoods.map((food) => (
              <div
                key={food.id}
                className="flex justify-between items-center p-3 bg-[#1B2A26] rounded-lg"
              >
                <div>
                  <h3 className="font-medium capitalize">{food.name}</h3>
                  <p className="text-sm text-gray-400">{food.serving}</p>
                  <p className="text-sm text-gray-500">{food.calories} cal</p>
                </div>
                <button className="p-2 text-[#80FF72] hover:bg-[#2E3C36] rounded-full">
                  <PlusIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Meals */}
        <div className="bg-[#2E3C36] rounded-lg p-6 flex flex-col h-[calc(100vh-280px)]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Today's Meals</h2>
            <span className="text-sm text-gray-400">{todaysMeals.length} items</span>
          </div>

          <div className="space-y-3 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-600">
            {todaysMeals.map((meal) => (
              <div
                key={meal.id}
                className="flex justify-between items-center p-3 bg-[#1B2A26] rounded-lg"
              >
                <div>
                  <h3 className="font-medium capitalize">{meal.name}</h3>
                  <p className="text-sm text-gray-400">{meal.serving}</p>
                  <p className="text-sm text-gray-500">{meal.calories} cal</p>
                </div>
                <button className="p-2 text-red-400 hover:bg-red-900 rounded-full">
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
