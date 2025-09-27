"use client";
import { useState } from "react";

export default function WorkoutPlanner() {
  const [level, setLevel] = useState("");
  const [equipment, setEquipment] = useState("");
  const [muscle, setMuscle] = useState("");
  const [workouts, setWorkouts] = useState([]);

  const handleGenerate = async () => {
    const res = await fetch("/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level, equipment, muscle }),
    });

    const data = await res.json();
    setWorkouts(data.exercises || []);
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">🏋️ Workout Planner</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Level */}
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="p-2 rounded-lg bg-gray-800 text-white"
        >
          <option value="">Select Level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        {/* Equipment */}
        <select
          value={equipment}
          onChange={(e) => setEquipment(e.target.value)}
          className="p-2 rounded-lg bg-gray-800 text-white"
        >
          <option value="">Any Equipment</option>
          <option value="body weight">Bodyweight (No Equipment)</option>
          <option value="dumbbell">Dumbbell</option>
          <option value="barbell">Barbell</option>
          <option value="machine">Machines</option>
        </select>

        {/* Muscle */}
        <select
          value={muscle}
          onChange={(e) => setMuscle(e.target.value)}
          className="p-2 rounded-lg bg-gray-800 text-white"
        >
          <option value="">Any Muscle</option>
          <option value="chest">Chest</option>
          <option value="back">Back</option>
          <option value="legs">Legs</option>
          <option value="shoulders">Shoulders</option>
          <option value="arms">Arms</option>
          <option value="core">Core/Abs</option>
        </select>
      </div>

      {/* Button */}
      <button
        onClick={handleGenerate}
        className="w-full bg-green-500 text-black font-bold py-2 rounded-lg hover:bg-green-600"
      >
        Generate Workout Plan
      </button>

      {/* Results */}
      <div className="mt-6 space-y-4">
        {workouts.length > 0 ? (
          workouts.map((w, i) => (
            <div key={i} className="bg-gray-800 p-4 rounded-lg text-white shadow-md">
              <h3 className="font-semibold text-lg">{w.name}</h3>
              <p className="text-sm text-gray-300">Type: {w.type}</p>
              <p className="text-sm text-gray-300">Muscle: {w.muscle}</p>
              <p className="text-sm text-gray-300">Equipment: {w.equipment}</p>
              <p className="text-sm text-gray-400 mt-2">{w.instructions}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No workouts yet. Generate a plan!</p>
        )}
      </div>
    </div>
  );
}
