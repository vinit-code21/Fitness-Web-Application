export default function Header() {
  const navItems = [
    { name: "Workouts", icon: "barbell-outline", href: "#workouts" },
    { name: "Diet", icon: "nutrition-outline", href: "#diet" },
    { name: "Assistant", icon: "sparkles-outline", href: "#assistant" },
    { name: "Register", icon: "person-add-outline", href: "/register" },
    { name: "Login", icon: "log-in-outline", href: "/login" }, // Login Button
  ];

  const greenColors = ["#80FF72", "#7EE8FA"]; // Green Gradient Colors

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-[#1a1a1a] shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold text-white">
        FitnessPro
      </div>

      {/* Nav */}
      <ul className="flex gap-5">
        {navItems.map((item, i) => (
          <li
            key={i}
            className="relative group w-[60px] h-[60px] rounded-full cursor-pointer transition-all duration-500 flex items-center justify-center bg-white shadow-xl hover:w-[180px]"
            style={{ "--i": greenColors[0], "--j": greenColors[1] }} // Applying green colors for all
          >
            {/* Hover ring effect */}
            <span className="absolute w-full h-full rounded-full border-2 border-[#80FF72] animate-ping opacity-0 group-hover:opacity-100 transition-all duration-500 z-0"></span>

            {/* Gradient background on hover */}
            <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--i),var(--j))] opacity-0 group-hover:opacity-100 transition-all duration-500 z-10"></span>

            {/* Glow blur behind */}
            <span className="absolute top-[10px] w-full h-full bg-[linear-gradient(45deg,var(--i),var(--j))] blur-lg opacity-0 group-hover:opacity-50 transition-all duration-500 z-0 rounded-full"></span>

            {/* Icon */}
            <span className="z-20 transition-all duration-500 delay-200 group-hover:scale-0">
              <ion-icon name={item.icon} class="text-[1.75em] text-[#777]"></ion-icon>
            </span>

            {/* Expanding title */}
            <a
              href={item.href}
              className="absolute text-white uppercase text-sm tracking-wider z-20 transform scale-0 group-hover:scale-100 transition-all duration-500 delay-200"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}
