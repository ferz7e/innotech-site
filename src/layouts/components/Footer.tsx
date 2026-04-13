import { LuArrowRight, LuFacebook, LuInstagram, LuLinkedin, LuMoon, LuSun, LuMail } from "react-icons/lu";
import { Link } from "react-router-dom";
import IconButton from "../../components/shared/IconButton";
import PrimaryButton from "../../components/shared/PrimaryButton";
import { NAVIGATION_GROUPS } from "./navigationData";

type FooterProps = {
  themeMode: "light" | "dark";
  onToggleTheme: () => void;
};

function Footer({ themeMode, onToggleTheme }: FooterProps) {
  const themeToggleLabel = themeMode === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro";
  const solutionItems = Array.from(new Set(NAVIGATION_GROUPS.flatMap((group) => group.items)));
  const innotechItems = [
    { label: "Nuestro equipo", href: "/nosotros" },
    { label: "Contacto", href: "/contact" },
    { label: "Portfolio", href: "/portfolio" },
  ];
  const socialLinks = [
    { label: "Instagram", href: "https://instagram.com", icon: <LuInstagram className="h-4 w-4" aria-hidden="true" /> },
    { label: "Facebook", href: "https://facebook.com", icon: <LuFacebook className="h-4 w-4" aria-hidden="true" /> },
    { label: "LinkedIn", href: "https://linkedin.com", icon: <LuLinkedin className="h-4 w-4" aria-hidden="true" /> },
    { label: "Gmail", href: "https://gmail.com", icon: <LuMail className="h-4 w-4" aria-hidden="true" /> },
  ];

  return (
    <footer className="flex w-full justify-center items-center border-t border-[var(--line)]">
      <div className="w-full max-w-[1240px] px-4 py-24">
        <div className="flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between md:gap-16">
          <div className="order-2 flex flex-col gap-4 md:order-1">
            <Link to="/" className="inline-block text-[1.8rem] font-black tracking-[-0.06em] text-[var(--text)]">
              Innotech
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              {socialLinks.map((socialItem) => (
                <IconButton
                  key={socialItem.label}
                  icon={socialItem.icon}
                  label={socialItem.label}
                  className="h-9 w-9 p-0"
                  onClick={() => window.open(socialItem.href, "_blank", "noopener,noreferrer")}
                />
              ))}
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-4">
              <PrimaryButton href="/acceso" icon={<LuArrowRight aria-hidden="true" />}>
                Acceder
              </PrimaryButton>
              <IconButton
                icon={
                  themeMode === "dark" ? (
                    <LuSun className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <LuMoon className="h-4 w-4" aria-hidden="true" />
                  )
                }
                label={themeToggleLabel}
                onClick={onToggleTheme}
                aria-pressed={themeMode === "dark"}
                className="h-8 w-8 p-0 shadow-[var(--shadow)]"
              />
            </div>
          </div>

          <div className="order-1 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12 md:order-2">
            <div>
              <p className="text-sm font-medium text-[var(--text)]">Soluciones</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {solutionItems.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-medium text-[var(--text)]">Inotech</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {innotechItems.map((item) => (
                  <li key={item.label}>
                    <Link to={item.href} className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
