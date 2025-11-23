"use client"; // Must be at top

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full h-[80vh] flex flex-col justify-center items-center text-center overflow-hidden px-6 md:px-12"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Floating Gradient Circles */}
      <div className="absolute -top-16 -left-16 w-48 h-48 md:w-60 md:h-60 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-16 -right-16 w-60 h-60 md:w-72 md:h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Main Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 animate-text-fade">
        Transform Your Fitness Journey
      </h1>

      {/* Subtext */}
      <p className="max-w-3xl text-base md:text-lg text-white/80">
        Personalized workouts, diet plans, and AI guidance – all in one place.
      </p>

      {/* CTA Button */}
      <a
        href="/register"
        className="mt-6 md:mt-8 inline-block px-6 md:px-8 py-3 md:py-4 font-bold text-black bg-gradient-to-r from-green-400 to-cyan-400 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500"
      >
        Get Started
      </a>
    </section>
  );
}
