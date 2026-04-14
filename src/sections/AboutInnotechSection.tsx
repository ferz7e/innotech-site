import { LuArrowRight } from "react-icons/lu";
import PrimaryButton from "../components/shared/PrimaryButton";
import SectionHeading from "../components/shared/SectionHeading";

/**
 * AboutInnotechSection - Componente de sección informativa "Sobre Nosotros".
 * * Presenta una breve introducción a la empresa mediante un layout flexible
 * que alterna entre contenido visual (placeholder) y descriptivo.
 */
function AboutInnotechSection() {
  return (
    <section className="relative flex items-center justify-center bg-[var(--bg-muted)]">
      <div className="pointer-events-none absolute inset-x-0 -top-36 z-10 h-36 bg-[linear-gradient(to_bottom,transparent_0%,var(--bg-muted)_100%)] md:hidden" />
      <div className="flex w-full max-w-[1240px] flex-col items-center gap-8 px-4 py-24 lg:flex-row">
        {/* Contenedor de Texto: Encabezados y llamado a la acción (CTA) */}
        <div className="flex w-full flex-1 flex-col items-center gap-8 text-center lg:items-start lg:text-left">
          <SectionHeading
            align="center"
            className="lg:items-start lg:text-left"
            title="Somos Innotech"
            subtitle="Especialistas en infraestructura, redes y seguridad para entornos donde la tecnología es parte crítica de la operación."
          />
          <div className="flex w-full justify-center lg:justify-start">
            <PrimaryButton href="/equipo" icon={<LuArrowRight className="h-3.5 w-3.5" aria-hidden="true" />}>
              Conocé a nuestro equipo
            </PrimaryButton>
          </div>
        </div>
        {/* Contenedor Visual: Reservado para material gráfico (Imágenes/Logos) */}
        <div className="flex min-h-[320px] w-full flex-1 items-center justify-center overflow-hidden px-4 text-center">
          <img
            src="https://picsum.photos/id/1048/1200/900"
            alt="Equipo técnico de Innotech trabajando en infraestructura y redes."
            className="h-full w-full rounded-xl object-cover object-center"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutInnotechSection;
