import { useEffect, useState } from "react";
import { LuArrowRight, LuChevronDown, LuChevronRight, LuX } from "react-icons/lu";
import IconButton from "../../components/shared/IconButton";
import PrimaryButton from "../../components/shared/PrimaryButton";
import { NAVIGATION_GROUPS } from "./navigationData";
import { LuFacebook, LuInstagram, LuMail } from "react-icons/lu";

type MobileNavMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  revealLogo?: boolean;
};

function MobileNavMenu({ isOpen, onClose, revealLogo = true }: MobileNavMenuProps) {
  const [openMobileCategory, setOpenMobileCategory] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    // Bloquea el scroll de fondo cuando el overlay mobile está activo.
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  const handleToggleMobileCategory = (category: string) => {
    setOpenMobileCategory((currentCategory) => (currentCategory === category ? null : category));
  };

  const handleCloseMenu = () => {
    setOpenMobileCategory(null);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-[60] px-4 pb-4 pt-4 transition-all duration-300 md:px-6 lg:hidden ${
        isOpen
          ? "pointer-events-auto bg-[color-mix(in_srgb,var(--text)_8%,transparent)] opacity-100 backdrop-blur-[2px]"
          : "pointer-events-none bg-transparent opacity-0 backdrop-blur-none"
      }`}
      aria-hidden={!isOpen}>
      <div
        className={`mx-auto flex h-full w-full max-w-[1288px] flex-col rounded-[2px] border border-[var(--line)] bg-[var(--bg)] transition-all duration-300 ${
          isOpen ? "translate-y-0 scale-100" : "translate-y-3 scale-[0.985]"
        }`}
        style={{ boxShadow: "var(--shadow)" }}>
        <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4">
          <a
            href="/"
            onClick={handleCloseMenu}
            className={`inline-block text-[1.8rem] font-black tracking-[-0.06em] text-[var(--text)] ${
              revealLogo ? "logo-teleport-enter" : "opacity-0"
            }`}>
            Innotech
          </a>
          <IconButton
            icon={<LuX aria-hidden="true" />}
            label="Cerrar navegación"
            onClick={handleCloseMenu}
            className="h-10 w-10 p-0 hover:opacity-85"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {NAVIGATION_GROUPS.map((group) => {
            const isCategoryOpen = openMobileCategory === group.category;

            return (
              <div key={group.category} className="border-b border-[var(--line)]">
                <button
                  type="button"
                  onClick={() => handleToggleMobileCategory(group.category)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left text-[1rem] font-medium text-[var(--text)]">
                  <span>{group.category}</span>
                  {isCategoryOpen ? (
                    <LuChevronDown className="h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                  ) : (
                    <LuChevronRight className="h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                  )}
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isCategoryOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}>
                  <div className="overflow-hidden">
                    <div className="space-y-3 pb-4 pl-1 pr-6">
                      {group.items.map((item) => (
                        <a
                          key={item}
                          href="/"
                          className="flex items-start gap-2 text-[0.92rem] leading-6 text-[var(--text-muted)] transition hover:text-[var(--text)]">
                          • <span>{item}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className=" flex items-center justify-between border-t border-[var(--line)] p-4">
          <div className="flex items-center gap-2">
            <IconButton icon={<LuInstagram className="h-4 w-4" aria-hidden="true" />} label="Instagram" />
            <IconButton icon={<LuMail className="h-4 w-4" aria-hidden="true" />} label="Gmail" />
            <IconButton icon={<LuFacebook className="h-4 w-4" aria-hidden="true" />} label="Facebook" />
          </div>
          <PrimaryButton href="/contact" icon={<LuArrowRight aria-hidden="true" />}>
            Contactanos
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default MobileNavMenu;
