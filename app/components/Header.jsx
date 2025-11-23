"use client";

export default function Header() {
  const navItems = [
    { name: "Workouts", icon: "barbell-outline", href: "#workouts" },
    { name: "Diet", icon: "nutrition-outline", href: "#diet" },
    { name: "Assistant", icon: "sparkles-outline", href: "#assistant" },
    { name: "Register", icon: "person-add-outline", href: "/register", cta: true, gradient: "from-green-400 to-cyan-400" },
    { name: "Login", icon: "log-in-outline", href: "/login", cta: true, gradient: "from-purple-500 to-pink-500" },
  ];

  const gradientColors = ["#80FF72", "#7EE8FA"];

  return (
    <header className="w-full flex justify-between items-center px-6 md:px-12 py-4 bg-[#1a1a1a] shadow-md z-50 fixed top-0 left-0">
      {/* Logo */}
      <div className="text-2xl font-bold text-white flex-shrink-0 cursor-pointer">
        FitnessPro
      </div>

      {/* Navigation */}
      <ul className="flex gap-4 md:gap-6 items-center">
        {navItems.map((item, i) => (
          <li
            key={i}
            className={`relative group w-14 h-14 md:w-16 md:h-16 rounded-full cursor-pointer flex items-center justify-center transition-all duration-500 overflow-hidden ${
              item.cta ? "hover:scale-110" : ""
            }`}
            style={{ "--i": gradientColors[0], "--j": gradientColors[1] }}
          >
            {/* Glow Background */}
            <span
              className={`absolute inset-0 rounded-full ${
                item.cta
                  ? `bg-gradient-to-r ${item.gradient}`
                  : "bg-[linear-gradient(45deg,var(--i),var(--j))]"
              } opacity-0 group-hover:opacity-100 transition-all duration-500 z-0`}
            ></span>

            {/* Blur Glow */}
            <span
              className={`absolute inset-0 rounded-full ${
                item.cta
                  ? `bg-gradient-to-r ${item.gradient}`
                  : "bg-[linear-gradient(45deg,var(--i),var(--j))]"
              } blur-lg opacity-0 group-hover:opacity-50 transition-all duration-500 z-0`}
            ></span>

            {/* Icon */}
            <span
              className={`z-10 transition-all duration-500 group-hover:scale-0 ${
                item.cta ? "text-white text-2xl md:text-[1.9em]" : "text-[#777] text-2xl md:text-[1.75em]"
              }`}
            >
              <ion-icon name={item.icon}></ion-icon>
            </span>

            {/* Expanding Text */}
            <a
              href={item.href}
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white uppercase text-xs md:text-sm tracking-wide z-20 transform scale-0 group-hover:scale-100 transition-all duration-500 font-semibold ${
                item.cta ? "md:text-base text-green-400" : ""
              }`}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}
