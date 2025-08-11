export default function Hero() {
  return (
    <section
      className="h-[70vh] bg-cover bg-center flex flex-col justify-center items-center text-center px-6"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg')",
      }}
    >
      <h1 className="text-5xl font-extrabold mb-4 text-celeste">
        Transform Your Fitness Journey
      </h1>
      <p className="max-w-2xl text-lg text-aquamarine">
        Personalized workouts, diet plans, and AI guidance – all in one place.
      </p>
    </section>
  );
}
