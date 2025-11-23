// app/dashboard/components/ProgressBars.jsx
export default function ProgressBars() {
  const bars = [
    { name: "Workout", progress: 70, color: "from-[#4CAF50] to-[#45A049]" },
    { name: "Diet", progress: 50, color: "from-[#2196F3] to-[#1976D2]" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6">
      {bars.map((bar, i) => (
        <div
          key={i}
          className="bg-[#2A2A2A]/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-700/50 h-48 flex flex-col justify-between relative overflow-hidden"
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${bar.color.replace('from-', 'from-')}/10 to-transparent`} />
          <div className="relative z-10">
            <h3 className="font-bold text-xl mb-2 text-white tracking-wide capitalize">{bar.name}</h3>
            <div className="w-full bg-gray-800/50 rounded-full h-3 overflow-hidden">
              <div
                className={`bg-gradient-to-r ${bar.color} h-3 rounded-full transition-all duration-700 shadow-lg relative overflow-hidden`}
                style={{ width: `${bar.progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-300 mt-3 flex justify-between items-center">
              <span>{bar.progress}%</span>
              <span className={`text-xs capitalize ${bar.name === 'Workout' ? 'text-[#4CAF50]' : 'text-[#2196F3]'}`}>Complete</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}