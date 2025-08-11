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
    <section id="workouts" className="py-16 bg-[#2E3C36] text-center">
      <h2 className="text-3xl font-bold mb-8 text-celeste">Workout Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8">
        {workouts.map((w, i) => (
          <div key={i} className="perspective">
            <div className="relative w-full h-[600px] transition-transform duration-700 transform-style preserve-3d hover:rotate-y-180 rounded-xl shadow-xl">
              
              {/* Front Side (Image with overlay title) */}
              <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden">
                <img
                  src={w.image}
                  alt={w.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{w.title}</h3>
                </div>
              </div>

              {/* Back Side (Text Info) */}
              <div className="absolute inset-0 bg-[#1F2925] text-white p-6 backface-hidden rotate-y-180 rounded-xl flex flex-col justify-center items-center">
                <h3 className="text-xl font-semibold mb-2 text-aquamarine">{w.title}</h3>
                <p className="text-celeste text-sm">{w.back}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
