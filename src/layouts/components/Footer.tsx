import { LuMoon, LuSun } from "react-icons/lu";
import IconButton from "../../components/shared/IconButton";

type FooterProps = {
  themeMode: "light" | "dark";
  onToggleTheme: () => void;
};

function Footer({ themeMode, onToggleTheme }: FooterProps) {
  const themeToggleLabel = themeMode === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro";

  return (
    <footer className="border-t border-[var(--line)]">
      <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-4 py-6">
        <p>Footer</p>
        <IconButton
          icon={
            themeMode === "dark" ? (
              <LuSun className="h-5 w-5" aria-hidden="true" />
            ) : (
              <LuMoon className="h-5 w-5" aria-hidden="true" />
            )
          }
          label={themeToggleLabel}
          onClick={onToggleTheme}
          aria-pressed={themeMode === "dark"}
          className="h-10 w-10 p-0 shadow-[var(--shadow)] hover:opacity-85"
        />
      </div>
    </footer>
  );
}

export default Footer;
