"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import useThemeStore from "@/store/themeStore";

export default function ThemeProvider({ children }) {
  const { theme, loadTheme } = useThemeStore();
  const pathname = usePathname();

  useEffect(() => {
    loadTheme();
  }, []);

  // Skip applying theme for home & register page
  const excludedPaths = ["/", "/register"];
  if (excludedPaths.includes(pathname)) {
    document.body.className = "";
    return children;
  }

  // Apply theme styles to body
  useEffect(() => {
    switch (theme) {
      case "light":
        document.body.style.backgroundColor = "#ffffff";
        document.body.style.color = "#000000";
        break;
      case "dark":
        document.body.style.backgroundColor = "#000000";
        document.body.style.color = "#ffffff";
        break;
      case "red":
        document.body.style.backgroundColor = "#2B0000";
        document.body.style.color = "#FF4C4C";
        break;
      case "default":
      default:
        document.body.style.backgroundColor = "#2E3C36";
        document.body.style.color = "#ffffff";
        break;
    }
  }, [theme]);

  return children;
}
