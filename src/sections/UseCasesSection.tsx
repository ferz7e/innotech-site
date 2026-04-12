import { LuArrowRight, LuCloud, LuInstagram, LuLockKeyhole, LuNetwork, LuShieldCheck, LuWorkflow } from "react-icons/lu";
import Card from "../components/shared/Card";
import SectionHeading from "../components/shared/SectionHeading";
import PrimaryButton from "../components/shared/PrimaryButton";
import SecondaryButton from "../components/shared/SecondaryButton";

const USE_CASES = [
  {
    icon: <LuNetwork className="h-8 w-8 text-[var(--accent-1)]" aria-hidden="true" />,
    title: "Conectividad corporativa",
    subtitle: "Unificamos sedes, equipos y usuarios con redes estables, seguras y listas para escalar.",
  },
  {
    icon: <LuShieldCheck className="h-8 w-8 text-[var(--accent-1)]" aria-hidden="true" />,
    title: "Seguridad perimetral",
    subtitle: "Protegemos activos críticos con monitoreo activo, hardening y políticas de acceso claras.",
  },
  {
    icon: <LuWorkflow className="h-8 w-8 text-[var(--accent-1)]" aria-hidden="true" />,
    title: "Automatización operativa",
    subtitle: "Reducimos tareas manuales con flujos automáticos para acelerar procesos internos.",
  },
  {
    icon: <LuCloud className="h-8 w-8 text-[var(--accent-1)]" aria-hidden="true" />,
    title: "Infraestructura híbrida",
    subtitle: "Combinamos nube y on-premise para balancear rendimiento, costos y continuidad.",
  },
  {
    icon: <LuLockKeyhole className="h-8 w-8 text-[var(--accent-1)]" aria-hidden="true" />,
    title: "Gestión de identidades",
    subtitle: "Centralizamos autenticación y permisos para minimizar riesgos y mejorar auditoría.",
  },
  {
    icon: <LuArrowRight className="h-8 w-8 text-[var(--accent-1)]" aria-hidden="true" />,
    title: "Evolución tecnológica",
    subtitle: "Diseñamos hojas de ruta IT por etapas para crecer sin interrumpir la operación diaria.",
  },
] as const;

function UseCasesSection() {
  return (
    <section className="p-4 border-x border-[var(--line)] bg-[var(--bg)]">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-8">
        <div>
          <SectionHeading
            align="center"
            title="Casos de uso"
            subtitle="Escenarios reales donde nuestras soluciones aportan eficiencia, seguridad y continuidad operativa."
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <PrimaryButton
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            icon={<LuInstagram className="h-3.5 w-3.5" aria-hidden="true" />}>
            Seguinos en Instagram
          </PrimaryButton>
          <SecondaryButton href="/contact" icon={<LuArrowRight className="h-3.5 w-3.5" aria-hidden="true" />}>
            Ver mas casos de uso
          </SecondaryButton>
        </div>

        <div className="grid grid-cols-3 grid-rows-2 gap-4">
          {USE_CASES.map((useCase) => (
            <Card key={useCase.title} icon={useCase.icon} title={useCase.title} subtitle={useCase.subtitle} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default UseCasesSection;
