"use client";

export default function Assistant() {
  return (
    <section id="assistant" className="py-16 bg-[#2E3C36] text-center">
      <h2 className="text-3xl font-bold mb-8 text-[#80FF72]">Your Fitness AI Assistant</h2>

      <div className="flex justify-center px-4">
        <div className="holographic-card w-full max-w-4xl p-10 rounded-xl text-white text-center shadow-2xl">
          <h3 className="text-4xl font-bold mb-4">Smart AI Coach</h3>
          <p className="text-lg leading-relaxed">
            Meet your personal AI assistant to guide your fitness journey. <br />
            Get smart workout suggestions, diet improvements, and motivational insights based on your goals. <br />
            Designed to stay with you — every rep, every meal, every step.
          </p>
        </div>
      </div>
    </section>
  );
}
