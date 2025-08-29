"use client";
import { useTheme } from "./ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      aria-label="Toggle dark/light mode"
      onClick={toggleTheme}
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className="fixed top-5 right-6 z-50 inline-flex items-center justify-center p-2 rounded-full bg-white shadow-md border border-gray-300 text-gray-700 hover:bg-gray-100 active:scale-95 transition-transform dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
    >
      {theme === "light" ? (
        <Moon className="text-blue-600" />
      ) : (
        <Sun className="text-yellow-400" />
      )}
    </button>
  );
}
