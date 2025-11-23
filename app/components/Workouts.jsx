"use client";

export default function Workouts() {
  const workouts = [
    {
      title: "Gain Weight",
      image: "/images/gain.jpg",
      back: "Strength & hypertrophy workouts tailored for muscle growth. Includes compound lifts, progressive overload, and bulking plans.",
    },
    {
      title: "Lose Weight",
      image: "/images/loss.jpg",
      back: "Fat-burning HIIT and cardio-based routines focused on shedding fat. Includes cardio, HIIT, and circuit training.",
    },
    {
      title: "Yoga & Flexibility",
      image: "/images/yoga.jpg",
      back: "Improve flexibility and mindfulness with guided yoga sessions. Posture, breathwork, and stress relief focused.",
    },
  ];

  return (
    <section id="workouts" className="py-20 bg-[#111] text-center relative overflow-x-hidden">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 animate-text-fade">
        Workout Plans
      </h2>

      <div className="flex flex-wrap justify-center gap-8 px-4 md:px-12">
        {workouts.map((w, i) => (
          <div key={i} className="w-full sm:w-[320px] h-[500px] perspective">
            <div className="relative w-full h-full transition-transform duration-700 transform-style preserve-3d rounded-2xl shadow-2xl hover:rotate-y-180">
              
              {/* Front Side */}
              <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden">
                <img
                  src={w.image}
                  alt={w.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-2xl md:text-3xl font-bold">{w.title}</h3>
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-lg border border-white/20 text-white p-6 backface-hidden rotate-y-180 rounded-2xl flex flex-col justify-center items-center transition-transform duration-500">
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-green-400">{w.title}</h3>
                <p className="text-sm md:text-base text-cyan-200">{w.back}</p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
