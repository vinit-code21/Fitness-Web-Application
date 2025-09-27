"use client";

import { useEffect, useState } from "react";

export default function BeginnerPage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [equipment, setEquipment] = useState("body weight");

  async function fetchWorkouts() {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/workouts?level=beginner&equipment=${encodeURIComponent(
          equipment
        )}`
      );
      const data = await res.json();
      setWorkouts(data.workouts || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchWorkouts();
  }, [equipment]);

  const bodyParts = ["Chest", "Back", "Arms", "Shoulders", "Core", "Legs"];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Beginner Workout Plan (~30 min)</h1>
      <p className="text-gray-400 mt-2">
        A quick but effective full-body plan targeting all major muscle groups.
      </p>

      {/* Equipment Selector */}
      <div className="mt-4 flex items-center gap-4">
        <label className="font-semibold text-white">Equipment</label>
        <select
          value={equipment}
          onChange={(e) => setEquipment(e.target.value)}
          className="rounded-md p-2 bg-gray-800 text-white"
        >
          <option>body weight</option>
          <option>dumbbell</option>
          <option>barbell</option>
          <option>kettlebell</option>
          <option>machine</option>
          <option>cable</option>
        </select>
        <button
          onClick={fetchWorkouts}
          className="ml-4 px-4 py-2 bg-green-400 text-black font-semibold rounded-lg"
        >
          Refresh
        </button>
      </div>

      {/* Workouts List */}
      {loading ? (
        <div className="text-yellow-300 mt-6">Loading workouts...</div>
      ) : (
        <div className="mt-6">
          {bodyParts.map((part) => (
            <div key={part} className="mb-6">
              <h2 className="text-xl font-bold text-green-400">{part}</h2>
              <div className="grid gap-4 mt-2">
                {workouts
                  .filter((ex) => ex.bodyPart === part)
                  .map((ex) => (
                    <div
                      key={ex.id}
                      className="p-4 rounded-lg bg-gray-800/60 flex gap-4 items-center"
                    >
                      <div className="w-24 h-24 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                        {ex.gifUrl ? (
                          <img
                            src={ex.gifUrl}
                            alt={ex.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No image
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-white">
                          {ex.name}
                        </h3>
                        <div className="text-sm text-gray-300">
                          Target: {ex.bodyPart} • Equipment: {ex.equipment}
                        </div>
                        <div className="text-sm mt-2">
                          {ex.sets} sets × {ex.reps} reps ({ex.duration})
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
