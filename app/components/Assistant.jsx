"use client";

export default function Assistant() {
  return (
    <section id="assistant" className="py-20 bg-[#111] text-center relative overflow-hidden">
      {/* Background floating gradients */}
      <div className="absolute -top-28 left-1/4 w-56 h-56 md:w-72 md:h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-28 right-1/4 w-64 h-64 md:w-80 md:h-80 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>

      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 animate-text-fade">
        Your Fitness AI Assistant
      </h2>

      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl p-8 md:p-12 rounded-2xl bg-white/10 backdrop-blur-lg shadow-2xl text-white text-center transition-transform hover:scale-[1.02]">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">Smart AI Coach</h3>
          <p className="text-base md:text-lg leading-relaxed md:leading-loose space-y-4">
            Meet your personal AI assistant to guide your fitness journey. <br />
            Get smart workout suggestions, diet improvements, and motivational insights based on your goals. <br />
            Designed to stay with you — every rep, every meal, every step.
          </p>
        </div>
      </div>
    </section>
  );
}
