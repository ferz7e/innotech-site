import { LuArrowRight } from "react-icons/lu";
import PrimaryButton from "../components/shared/PrimaryButton";
import SectionHeading from "../components/shared/SectionHeading";

/**
 * AboutInnotechSection - Componente de sección informativa "Sobre Nosotros".
 * * Presenta una breve introducción a la empresa mediante un diseño de cuadrícula (grid)
 * que alterna entre contenido visual (placeholder) y descriptivo.
 */
function AboutInnotechSection() {
  return (
    <section className="flex items-center justify-center bg-[var(--bg-muted)]">
      <div className="grid w-full max-w-[1240px] grid-cols-1 items-center gap-8 lg:grid-cols-2 px-4 py-24">
        {/* Contenedor Visual: Reservado para material gráfico (Imágenes/Logos) */}
        <div className="order-2 flex min-h-[320px] items-center justify-center overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--bg)] px-6 text-center lg:order-1 lg:min-h-[420px]">
          {/* TODO: Implementar imagen optimizada una vez definido el asset final.
              Referencia de implementación:
              <img
                src={aboutImage}
                alt="Equipo técnico de Innotech trabajando en infraestructura y redes."
                className="w-[400px] object-cover object-center"
                loading="lazy"
              />
          */}
          <p className="text-sm font-medium text-[var(--text-muted)] md:text-base">
            Espacio reservado para imagen, logo, etc.
          </p>
        </div>

        {/* Contenedor de Texto: Encabezados y llamado a la acción (CTA) */}
        <div className="order-1 flex flex-col gap-8 lg:order-2">
          <SectionHeading
            align="end"
            title="Somos Innotech"
            subtitle="Especialistas en infraestructura, redes y seguridad para entornos donde la tecnología es parte crítica de la operación."
          />

          <div className="flex justify-end">
            <PrimaryButton href="/equipo" icon={<LuArrowRight className="h-3.5 w-3.5" aria-hidden="true" />}>
              Conocé a nuestro equipo
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutInnotechSection;
