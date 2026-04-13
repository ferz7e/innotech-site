import { LuChevronDown } from "react-icons/lu";
import { NAVIGATION_GROUPS } from "./navigationData";

function DesktopNavMenu() {
  return (
    // Menú de escritorio con mega-dropdown por categoría.
    <nav className="hidden items-start gap-4 lg:flex">
      {NAVIGATION_GROUPS.map((group) => (
        <div key={group.category} className="group/menu relative z-10">
          <button
            type="button"
            className="inline-flex max-w-[150px] cursor-pointer items-start gap-1.5 text-left text-[0.88rem] font-medium leading-[1.15] text-[color-mix(in_srgb,var(--text)_80%,transparent)] transition hover:text-[var(--text)]">
            <span>{group.category}</span>
            <LuChevronDown className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[color-mix(in_srgb,var(--text)_80%,transparent)] transition-all duration-300 group-hover/menu:rotate-180 group-hover/menu:text-[var(--text)]" />
          </button>

          <div className="pointer-events-none absolute left-0 top-full z-50 scale-[0.96] translate-x-[-14px] pt-8 opacity-0 transition-all duration-300 ease-out group-hover/menu:pointer-events-auto group-hover/menu:scale-100 group-hover/menu:translate-x-0 group-hover/menu:opacity-100">
            <div className="min-w-[320px] rounded-md border border-[var(--line)] bg-[var(--bg)] p-4">
              <p className="text-[0.78rem] font-semibold leading-snug text-[var(--text)]">{group.category}</p>

              <div className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <a
                    key={item}
                    href="/"
                    className="flex items-start gap-2 text-[0.82rem] leading-snug text-[var(--text-muted)] transition hover:text-[var(--text)]">
                    <span className="text-current">•</span>
                    <span>{item}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </nav>
  );
}

export default DesktopNavMenu;
