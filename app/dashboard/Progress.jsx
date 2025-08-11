// app/dashboard/components/ProgressBars.jsx
export default function ProgressBars() {
  const bars = [
    { name: "Workout", progress: 70, color: "bg-[#80FF72]" },
    { name: "Diet", progress: 50, color: "bg-[#7EE8FA]" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {bars.map((bar, i) => (
        <div key={i} className="bg-[#1f2925] p-4 rounded-lg shadow-lg">
          <div className="flex justify-between mb-2">
            <span>{bar.name}</span>
            <span>{bar.progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className={`${bar.color} h-3 rounded-full`}
              style={{ width: `${bar.progress}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
