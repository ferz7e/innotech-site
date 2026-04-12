import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

type ThemeMode = "light" | "dark";
const THEME_STORAGE_KEY = "innotech-theme";

const getInitialThemeMode = (): ThemeMode => {
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

function MainLayout() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialThemeMode);

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
    document.documentElement.style.colorScheme = themeMode;
    window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
  }, [themeMode]);

  const handleToggleTheme = () => {
    setThemeMode((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] bg-[var(--bg)] text-[var(--text)]">
      <Header />
      <main className="mx-auto w-full max-w-[1240px] px-4 py-10">
        <Outlet />
      </main>
      <Footer themeMode={themeMode} onToggleTheme={handleToggleTheme} />
    </div>
  );
}

export default MainLayout;
