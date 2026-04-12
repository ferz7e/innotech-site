import { LuArrowRight } from "react-icons/lu";
import aboutImage from "../assets/react.svg";
import PrimaryButton from "../components/shared/PrimaryButton";
import SectionHeading from "../components/shared/SectionHeading";

function AboutInnotechSection() {
  return (
    <section className="border-x border-[var(--line)] bg-[linear-gradient(to_bottom,var(--bg-muted)_0%,var(--bg)_100%)] px-4 py-24">
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-8 lg:grid-cols-2">
        <div className="flex min-h-[320px] items-center justify-center overflow-hidden lg:min-h-[420px]">
          <img
            src={aboutImage}
            alt="Equipo técnico de Innotech trabajando en infraestructura y redes."
            className="w-[400px] object-cover object-center"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col gap-8">
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
