import Header from "./components/Header";
import Hero from "./components/Hero";
import Workouts from "./components/Workouts";
import Diet from "./components/Diet";
import Assistant from "./components/Assistant";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <Hero />
      <Workouts />
      <Diet />
      <Assistant />
      <Footer />
    </div>
  );
}

