// /components/PlanPage.jsx
"use client";

export default function PlanPage({ title, description, days, type = "workout" }) {
  return (
    <div className="flex-1 bg-[#1B2A26] p-6 rounded-xl shadow-lg border border-gray-800 min-h-[400px]">
      <h1 className="text-2xl font-bold mb-2 text-white text-center">{title}</h1>
      <p className="text-gray-300 text-center mb-6">{description}</p>

      <div className="grid gap-4">
        {days.map((day, i) => (
          <div key={i} className="p-4 bg-[#243832] rounded-lg border border-gray-700">
            <h3 className="text-[#80FF72] font-semibold mb-2">{day.day}</h3>
            <ul className="list-disc pl-6 text-gray-300">
              {(type === "diet" ? day.meals : day.exercises).map((item, idx) => (
                <li key={idx} className="mb-1">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
// This component displays a workout or diet plan with a title, description, and a list of days with exercises or meals.