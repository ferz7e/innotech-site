import { useState } from "react";
import { LuArrowRight, LuMenu } from "react-icons/lu";
import PrimaryButton from "../../components/shared/PrimaryButton";
import IconButton from "../../components/shared/IconButton";
import DesktopNavMenu from "./DesktopNavMenu";
import MobileNavMenu from "./MobileNavMenu";

type HeaderProps = {
  revealLogo?: boolean;
};

function Header({ revealLogo = true }: HeaderProps) {
  // El Header solo controla la apertura/cierre del menú mobile.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOpenMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--bg)]">
      <div className="relative mx-auto flex w-full max-w-[1240px] items-center justify-between p-4">
        <div className="flex items-center gap-16">
          {/* Marca principal (se puede revelar tras loader). */}
          <a
            href="/"
            className={`inline-block text-[1.8rem] font-black tracking-[-0.06em] text-[var(--text)] ${
              revealLogo ? "logo-teleport-enter" : "opacity-0"
            }`}>
            Innotech
          </a>
          <DesktopNavMenu />
        </div>
        <div className="hidden items-center gap-4 lg:flex">
          <PrimaryButton href="/contact" icon={<LuArrowRight aria-hidden="true" />}>
            Contactanos
          </PrimaryButton>
        </div>
        {/* mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <IconButton
            icon={<LuMenu aria-hidden="true" />}
            label="Abrir menú"
            onClick={handleOpenMobileMenu}
            className="h-10 w-10 p-0 shadow-[var(--shadow)]"
          />
        </div>
      </div>
      {/* Overlay y contenido del menú mobile. */}
      <MobileNavMenu isOpen={isMobileMenuOpen} onClose={handleCloseMobileMenu} revealLogo={revealLogo} />
    </header>
  );
}

export default Header;
